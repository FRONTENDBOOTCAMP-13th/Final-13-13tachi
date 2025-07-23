'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: { matchVisual: false },
  };

  const formats = [
    'header', 'font', 'size', 'bold', 'italic',
    'underline', 'strike', 'blockquote',
    'list', 'indent', 'link', 'image', 'video',
  ];

  return (
    <div className="h-[32.5rem] rounded-lg">
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme="snow"
        value={value}
        onChange={onChange}
        style={{ height: '90%' }}
      />
      <input type="hidden" name="content" value={value} />
    </div>
  );
}
