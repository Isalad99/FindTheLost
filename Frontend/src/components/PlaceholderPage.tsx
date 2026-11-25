interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex-1 min-h-[500px] flex flex-col items-center justify-center p-8 bg-white/70 rounded-3xl border border-gray-200 text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
    </div>
  );
}
