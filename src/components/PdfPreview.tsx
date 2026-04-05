interface PdfPreviewProps {
  url: string;
  title?: string;
}

export default function PdfPreview({ url, title = 'PDF' }: PdfPreviewProps) {
  return (
    <div className="my-8">
      <div className="rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
        <iframe
          src={url}
          title={title}
          className="w-full border-0"
          style={{ height: '80vh', minHeight: 500 }}
        />
      </div>
      <div className="mt-3 text-center">
        <a
          href={url}
          download
          className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          הורד PDF
        </a>
      </div>
    </div>
  );
}
