'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import RecipeEditLoading from '../[_id]/edit/Loading';

const QuillNoSSRWrapper = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <RecipeEditLoading />,
});

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const modules = {
    toolbar: [['bold', 'italic', 'underline', 'strike'], ['link'], ['clean']],
  };

  const formats = [
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
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
