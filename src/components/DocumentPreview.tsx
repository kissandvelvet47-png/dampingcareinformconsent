import { forwardRef } from 'react';
import { FormData } from '../types';

const LOGO_SRC = '/cropped_circle_image.png';

const CONSENT_TEXT =
  'Saya menyatakan bahwa saya telah membaca, memahami, dan menyetujui informasi mengenai layanan Dampingcare. Saya memberikan persetujuan agar layanan dilaksanakan sesuai dengan kesepakatan yang telah dibuat.';

interface Props {
  data: FormData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '_______________';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
};

// ─── Variant 1: Classic Hospital Form ────────────────────────────────────────
function ClassicVariant({ data }: Props) {
  return (
    <div
      className="doc-page doc-classic"
      style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '11pt', lineHeight: '1.6' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <img src={LOGO_SRC} alt="Dampingcare" style={{ width: '64px', height: '64px', objectFit: 'contain', marginRight: '16px' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 700, fontSize: '16pt', textAlign: 'center', letterSpacing: '2px' }}>
            INFORM CONSENT
          </div>
          <div style={{ textAlign: 'center', fontSize: '10pt', color: '#444' }}>
            Persetujuan Pelaksanaan Layanan Dampingcare
          </div>
        </div>
        <div style={{ width: '64px' }} />
      </div>
      <hr style={{ border: 'none', borderTop: '1.5px solid #111', margin: '0 0 14px 0' }} />

      {/* Identity Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', fontSize: '10.5pt' }}>
        <tbody>
          {[
            ['No. Dokumen', data.nomorDokumen || '—'],
            ['Tanggal', formatDate(data.tanggal)],
            ['Nama Pasien', data.namaPasien || '—'],
            ['Nama Pengisi', data.namaPengisi || '—'],
            ['Hub. dengan Pasien', data.hubungan || '—'],
            ['Nama Pelaksana', data.namaPelaksana || '—'],
          ].map(([label, val]) => (
            <tr key={label}>
              <td style={{ width: '38%', padding: '4px 6px', fontWeight: 600, verticalAlign: 'top', border: '1px solid #ccc', backgroundColor: '#f7f7f7' }}>{label}</td>
              <td style={{ padding: '4px 6px', verticalAlign: 'top', border: '1px solid #ccc' }}>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Content */}
      <div style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: 700, fontSize: '11pt', marginBottom: '6px' }}>
        PERNYATAAN PERSETUJUAN
      </div>
      <p style={{ textAlign: 'justify', marginBottom: '20px', fontSize: '10.5pt' }}>
        {CONSENT_TEXT}
      </p>

      {/* Signature */}
      <div style={{ marginTop: '24px' }}>
        <div style={{ fontSize: '10.5pt', fontWeight: 600, marginBottom: '6px' }}>Tanda Tangan Pengisi:</div>
        <div style={{ border: '1px solid #ccc', width: '220px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', backgroundColor: '#fafafa' }}>
          {data.signatureDataUrl
            ? <img src={data.signatureDataUrl} alt="ttd" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            : <span style={{ color: '#bbb', fontSize: '9pt' }}>—</span>
          }
        </div>
        <div style={{ fontSize: '10pt' }}>Nama Terang: <strong>{data.namaPengisi || '—'}</strong></div>
        <div style={{ fontSize: '10pt' }}>Tanggal: {formatDate(data.tanggal)}</div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #ddd', fontSize: '8.5pt', color: '#888', textAlign: 'center' }}>
        Dokumen dibuat melalui Sistem Dampingcare.
      </div>
    </div>
  );
}

// ─── Variant 2: Official Legal Document ──────────────────────────────────────
function LegalVariant({ data }: Props) {
  return (
    <div
      className="doc-page doc-legal"
      style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '11pt', lineHeight: '1.7', border: '1.5px solid #111' }}
    >
      {/* Top bar: doc number left, empty right */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ fontSize: '9pt', color: '#555' }}>
          No. Dokumen: <strong>{data.nomorDokumen || '—'}</strong>
        </div>
        <div style={{ fontSize: '9pt', color: '#555' }}>
          Tanggal: {formatDate(data.tanggal)}
        </div>
      </div>

      {/* Centered logo + title */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <img src={LOGO_SRC} alt="Dampingcare" style={{ width: '72px', height: '72px', objectFit: 'contain', display: 'block', margin: '0 auto 8px' }} />
        <div style={{ fontWeight: 700, fontSize: '16pt', letterSpacing: '3px', textTransform: 'uppercase' }}>
          Inform Consent
        </div>
        <div style={{ fontSize: '10pt', color: '#444', marginTop: '2px' }}>
          Persetujuan Pelaksanaan Layanan Dampingcare
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #111', margin: '0 0 16px 0' }} />

      {/* Identity section */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '18px', fontSize: '10.5pt' }}>
        <tbody>
          {[
            ['Nama Pasien', data.namaPasien || '—'],
            ['Nama Pengisi', data.namaPengisi || '—'],
            ['Hubungan dengan Pasien', data.hubungan || '—'],
            ['Nama Pelaksana', data.namaPelaksana || '—'],
          ].map(([label, val]) => (
            <tr key={label}>
              <td style={{ width: '42%', padding: '5px 8px', fontWeight: 600, verticalAlign: 'top', borderBottom: '1px solid #ddd' }}>{label}</td>
              <td style={{ padding: '5px 8px', verticalAlign: 'top', borderBottom: '1px solid #ddd' }}>: {val}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Body */}
      <p style={{ textAlign: 'justify', marginBottom: '22px', fontSize: '11pt', lineHeight: 1.8 }}>
        {CONSENT_TEXT}
      </p>

      {/* Signature block */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
        <div style={{ textAlign: 'center', minWidth: '200px' }}>
          <div style={{ fontSize: '10.5pt', marginBottom: '4px' }}>Pengisi,</div>
          <div style={{ border: '1px solid #111', width: '200px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
            {data.signatureDataUrl
              ? <img src={data.signatureDataUrl} alt="ttd" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              : <span style={{ color: '#ccc', fontSize: '9pt' }}>—</span>
            }
          </div>
          <div style={{ fontSize: '10pt', borderTop: '1px solid #333', paddingTop: '4px', minWidth: '180px' }}>
            {data.namaPengisi || '___________________'}
          </div>
          <div style={{ fontSize: '9pt', color: '#555' }}>{formatDate(data.tanggal)}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #aaa', fontSize: '8.5pt', color: '#777', textAlign: 'center' }}>
        Dokumen ini dibuat secara digital melalui Sistem Dampingcare.
      </div>
    </div>
  );
}

// ─── Variant 3: Minimal Clean Document ───────────────────────────────────────
function MinimalVariant({ data }: Props) {
  return (
    <div
      className="doc-page doc-minimal"
      style={{ fontFamily: "'Cambria', 'Georgia', 'Times New Roman', serif", fontSize: '11pt', lineHeight: '1.65', position: 'relative', overflow: 'hidden' }}
    >
      {/* Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-30deg)',
          fontSize: '72pt',
          fontWeight: 900,
          color: '#000',
          opacity: 0.035,
          letterSpacing: '4px',
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
      >
        DAMPINGCARE
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <img src={LOGO_SRC} alt="Dampingcare" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '13pt', letterSpacing: '1.5px' }}>INFORM CONSENT</div>
            <div style={{ fontSize: '9pt', color: '#777', marginTop: '1px' }}>Persetujuan Pelaksanaan Layanan Dampingcare</div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '0 0 18px 0' }} />

        {/* Meta */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9pt', color: '#777', marginBottom: '18px' }}>
          <span>No. {data.nomorDokumen || '—'}</span>
          <span>{formatDate(data.tanggal)}</span>
        </div>

        {/* Identity */}
        <div style={{ marginBottom: '20px' }}>
          {[
            ['Nama Pasien', data.namaPasien],
            ['Nama Pengisi', data.namaPengisi],
            ['Hubungan dengan Pasien', data.hubungan],
            ['Nama Pelaksana', data.namaPelaksana],
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', padding: '6px 0', borderBottom: '1px solid #f0f0f0', fontSize: '10.5pt' }}>
              <span style={{ width: '45%', color: '#555', fontStyle: 'italic' }}>{label}</span>
              <span style={{ color: '#111', fontWeight: 500 }}>{val || '—'}</span>
            </div>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 0 16px 0' }} />

        {/* Content */}
        <p style={{ textAlign: 'justify', color: '#222', marginBottom: '28px', fontSize: '10.5pt', lineHeight: 1.8 }}>
          {CONSENT_TEXT}
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 0 18px 0' }} />

        {/* Signature */}
        <div style={{ marginBottom: '8px', fontSize: '10pt', color: '#555' }}>Tanda Tangan Pengisi</div>
        <div style={{ borderBottom: '1px solid #333', width: '200px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
          {data.signatureDataUrl
            ? <img src={data.signatureDataUrl} alt="ttd" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            : null
          }
        </div>
        <div style={{ fontSize: '10pt', color: '#333', fontWeight: 600 }}>{data.namaPengisi || '—'}</div>
        <div style={{ fontSize: '9pt', color: '#888', marginTop: '2px' }}>{formatDate(data.tanggal)}</div>

        {/* Footer */}
        <div style={{ marginTop: '32px', fontSize: '8pt', color: '#bbb', textAlign: 'right' }}>
          Dokumen dibuat melalui Sistem Dampingcare.
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
const DocumentPreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  return (
    <div ref={ref} className="doc-preview-outer">
      {data.variant === 'classic' && <ClassicVariant data={data} />}
      {data.variant === 'legal' && <LegalVariant data={data} />}
      {data.variant === 'minimal' && <MinimalVariant data={data} />}
    </div>
  );
});

DocumentPreview.displayName = 'DocumentPreview';

export default DocumentPreview;
