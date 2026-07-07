import { FormData, DocumentVariant } from '../types';
import SignatureCanvas from './SignatureCanvas';

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

const VARIANTS: { id: DocumentVariant; label: string; desc: string }[] = [
  { id: 'classic', label: 'Classic Hospital', desc: 'Formulir Rumah Sakit' },
  { id: 'legal', label: 'Official Legal', desc: 'Surat Persetujuan Resmi' },
  { id: 'minimal', label: 'Minimal Clean', desc: 'Administrasi Modern' },
];

export default function FormPanel({ data, onChange }: Props) {
  return (
    <div className="form-panel">
      {/* Variant Selector */}
      <div className="form-section">
        <label className="form-section-title">Pilih Desain</label>
        <div className="variant-grid">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`variant-btn ${data.variant === v.id ? 'variant-btn--active' : ''}`}
              onClick={() => onChange({ variant: v.id })}
            >
              <span className="variant-btn__name">{v.label}</span>
              <span className="variant-btn__desc">{v.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Identity Fields */}
      <div className="form-section">
        <label className="form-section-title">Data Identitas</label>

        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">Nama Pasien <span className="required">*</span></label>
            <input
              type="text"
              className="form-input"
              placeholder="Nama lengkap pasien"
              value={data.namaPasien}
              onChange={(e) => onChange({ namaPasien: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Nama Pengisi <span className="required">*</span></label>
            <input
              type="text"
              className="form-input"
              placeholder="Nama pengisi formulir"
              value={data.namaPengisi}
              onChange={(e) => onChange({ namaPengisi: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Hubungan dengan Pasien <span className="optional">(Opsional)</span></label>
            <input
              type="text"
              className="form-input"
              placeholder="Mis. Anak kandung, Istri, dll."
              value={data.hubungan}
              onChange={(e) => onChange({ hubungan: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Nama Pelaksana <span className="required">*</span></label>
            <input
              type="text"
              className="form-input"
              placeholder="Nama pelaksana layanan"
              value={data.namaPelaksana}
              onChange={(e) => onChange({ namaPelaksana: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Tanggal <span className="required">*</span></label>
            <input
              type="date"
              className="form-input"
              value={data.tanggal}
              onChange={(e) => onChange({ tanggal: e.target.value })}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Nomor Dokumen</label>
            <input
              type="text"
              className="form-input form-input--readonly"
              value={data.nomorDokumen || 'Membuat nomor...'}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="form-section">
        <label className="form-section-title">Tanda Tangan Digital</label>
        <SignatureCanvas
          value={data.signatureDataUrl}
          onChange={(sig) => onChange({ signatureDataUrl: sig })}
        />
      </div>
    </div>
  );
}
