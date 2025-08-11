import Link from 'next/link';
export default function Home() {
  return (
    <main className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">AI Policy Builder for Schools</h1>
        <p className="text-gray-600">District-ready AI policies, training slides, and parent letters — in minutes.</p>
      </div>
      <div className="space-x-3">
        <Link href="/onboard" className="inline-block rounded bg-black px-4 py-2 text-white">Get Started</Link>
        <Link href="/admin" className="inline-block rounded border px-4 py-2">Admin</Link>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <li className="rounded border bg-white p-4"><div className="font-semibold">Policy Generator</div><p className="text-sm text-gray-600">Staff & student policies matched to your risk tier.</p></li>
        <li className="rounded border bg-white p-4"><div className="font-semibold">Update Engine</div><p className="text-sm text-gray-600">Push template updates to all subscribers.</p></li>
        <li className="rounded border bg-white p-4"><div className="font-semibold">Comms & Training</div><p className="text-sm text-gray-600">Parent letters and slide decks generated automatically.</p></li>
      </ul>
    </main>
  );
}