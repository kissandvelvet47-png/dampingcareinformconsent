import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ImageRun,
  HeadingLevel,
  ShadingType,
  convertInchesToTwip,
  Footer,
} from 'docx';
import { saveAs } from 'file-saver';
import { FormData } from '../types';

async function fetchImageBuffer(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  return res.arrayBuffer();
}

async function dataUrlToBuffer(dataUrl: string): Promise<ArrayBuffer> {
  const res = await fetch(dataUrl);
  return res.arrayBuffer();
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '_______________';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
};

const CONSENT_TEXT =
  'Saya menyatakan bahwa saya telah membaca, memahami, dan menyetujui informasi mengenai layanan Dampingcare. Saya memberikan persetujuan agar layanan dilaksanakan sesuai dengan kesepakatan yang telah dibuat.';

export async function exportToDocx(data: FormData): Promise<void> {
  const logoBuffer = await fetchImageBuffer('/cropped_circle_image.png');

  const margin = convertInchesToTwip(1);
  const pageWidth = convertInchesToTwip(8.27);
  const contentWidth = pageWidth - margin * 2;

  const logoImage = new ImageRun({
    data: logoBuffer,
    transformation: { width: 60, height: 60 },
    type: 'png',
  });

  const identityRows = [
    ['No. Dokumen', data.nomorDokumen || '—'],
    ['Tanggal', formatDate(data.tanggal)],
    ['Nama Pasien', data.namaPasien || '—'],
    ['Nama Pengisi', data.namaPengisi || '—'],
    ['Hubungan dengan Pasien', data.hubungan || '—'],
    ['Nama Pelaksana', data.namaPelaksana || '—'],
  ];

  let signatureImage: ImageRun | null = null;
  if (data.signatureDataUrl) {
    try {
      const sigBuffer = await dataUrlToBuffer(data.signatureDataUrl);
      signatureImage = new ImageRun({
        data: sigBuffer,
        transformation: { width: 160, height: 60 },
        type: 'png',
      });
    } catch {
      signatureImage = null;
    }
  }

  const makeIdentityTable = () =>
    new Table({
      width: { size: contentWidth, type: WidthType.DXA },
      rows: identityRows.map(([label, val]) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: 38 * 50, type: WidthType.DXA },
              shading: { type: ShadingType.SOLID, color: 'F7F7F7', fill: 'F7F7F7' },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: label, bold: true, size: 20 })],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: val, size: 20 })],
                }),
              ],
            }),
          ],
        })
      ),
    });

  const makeConsentSection = () => [
    new Paragraph({
      children: [new TextRun({ text: 'PERNYATAAN PERSETUJUAN', bold: true, size: 22 })],
      spacing: { before: 200, after: 100 },
    }),
    new Paragraph({
      children: [new TextRun({ text: CONSENT_TEXT, size: 21 })],
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 200 },
    }),
  ];

  const makeSignatureSection = () => {
    const children: Paragraph[] = [
      new Paragraph({
        children: [new TextRun({ text: 'Tanda Tangan Pengisi:', bold: true, size: 20 })],
        spacing: { before: 300, after: 100 },
      }),
    ];

    if (signatureImage) {
      children.push(
        new Paragraph({
          children: [signatureImage],
          spacing: { after: 80 },
        })
      );
    } else {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: ' ', size: 20 })],
          spacing: { after: 400 },
        })
      );
    }

    children.push(
      new Paragraph({
        children: [new TextRun({ text: `Nama Terang: ${data.namaPengisi || '—'}`, size: 20 })],
      }),
      new Paragraph({
        children: [new TextRun({ text: `Tanggal: ${formatDate(data.tanggal)}`, size: 20 })],
        spacing: { after: 200 },
      })
    );

    return children;
  };

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: convertInchesToTwip(8.27), height: convertInchesToTwip(11.69) },
            margin: { top: margin, right: margin, bottom: margin, left: margin },
          },
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Dokumen dibuat melalui Sistem Dampingcare.', size: 17, color: '888888' })],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: [
          new Paragraph({
            children: [logoImage],
            alignment: AlignmentType.LEFT,
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'INFORM CONSENT', bold: true, size: 32, font: 'Times New Roman' })],
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Persetujuan Pelaksanaan Layanan Dampingcare', size: 20, color: '555555' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '111111' } },
            children: [],
            spacing: { after: 200 },
          }),
          makeIdentityTable(),
          ...makeConsentSection(),
          ...makeSignatureSection(),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `InformConsent_${data.nomorDokumen || 'dokumen'}.docx`);
}
