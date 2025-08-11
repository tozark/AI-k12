'use client';
import React, { useState } from 'react';
import { z } from 'zod';
const Intake = z.object({
  districtName: z.string().min(2),
  state: z.string().length(2),
  studentCount: z.number().int().positive(),
  riskTier: z.enum(['LOW','MEDIUM','HIGH']),
  aiUseAreas: z.array(z.string()).min(1),
  contactEmail: z.string().email(),
});
export default function OnboardPage() {
  const [v, setV] = useState<any>({ districtName:'', state:'', studentCount:1000, riskTier:'MEDIUM', aiUseAreas:[], contactEmail:'' });
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const submit = async () => {
    setErr(null);
    try {
      const parsed = Intake.parse({ ...v, studentCount: Number(v.studentCount) });
      setLoading(true);
      const r = await fetch('/api/generate', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(parsed) });
      const data = await r.json();
      setResp(data);
    } catch(e:any){ setErr(e?.message ?? 'Invalid input'); } finally { setLoading(false); }
  };
  const toggle = (s:string)=> setV((x:any)=>({ ...x, aiUseAreas: x.aiUseAreas.includes(s) ? x.aiUseAreas.filter((y:string)=>y!==s) : [...x.aiUseAreas, s] }));
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">District Intake</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <input className="border p-2 rounded" placeholder="District name" value={v.districtName} onChange={e=>setV({...v, districtName:e.target.value})}/>
        <input className="border p-2 rounded" placeholder="State (e.g., MO)" value={v.state} onChange={e=>setV({...v, state:e.target.value.toUpperCase().slice(0,2)})}/>
        <input className="border p-2 rounded" placeholder="Student count" type="number" value={v.studentCount} onChange={e=>setV({...v, studentCount:e.target.value})}/>
        <select className="border p-2 rounded" value={v.riskTier} onChange={e=>setV({...v, riskTier:e.target.value})}>
          <option value="LOW">Low</option><option value="MEDIUM">Medium</option><option value="HIGH">High</option>
        </select>
        <input className="border p-2 rounded" placeholder="Contact email" value={v.contactEmail} onChange={e=>setV({...v, contactEmail:e.target.value})}/>
      </div>
      <div className="space-y-2">
        <div className="font-medium">AI Use Areas</div>
        <div className="flex flex-wrap gap-2">
          {['Instruction','Assessment','Special Education','IT/Operations','Communications'].map(tag=>(
            <button key={tag} onClick={()=>toggle(tag)} className={`px-3 py-1 rounded border ${v.aiUseAreas.includes(tag)?'bg-black text-white':'bg-white'}`}>{tag}</button>
          ))}
        </div>
      </div>
      <button onClick={submit} disabled={loading} className="rounded bg-black px-4 py-2 text-white">{loading?'Generating…':'Generate Policy Packet'}</button>
      {err && <div className="text-red-600">{err}</div>}
      {resp && (
        <div className="rounded border bg-white p-4">
          <h2 className="font-semibold mb-2">Generated Files (sample)</h2>
          <ul className="list-disc ml-5">
            {resp.files?.map((f:any)=>(<li key={f.name}><a className="text-blue-600 underline" href={f.url}>{f.name}</a></li>))}
          </ul>
          <pre className="mt-4 text-xs bg-gray-50 p-3 overflow-auto">{JSON.stringify(resp.meta, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}