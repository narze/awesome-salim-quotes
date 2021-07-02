import { useState } from "react"
import { supabase } from "../utils/supabaseClient"

export default function Submit({ onSubmit }: { onSubmit: () => void }) {
  const [body, setBody] = useState("")
  const [url, setUrl] = useState("")

  async function submitForm() {
    const { error } = await supabase.from("Quote").insert([{ body, url }])

    if (error) {
      alert(error.message)
    } else {
      alert("ขอบคุณ วาทะสลิ่มนี้จะถูกตรวจสอบและนำขึ้นหน้าเว็บเร็วๆ นี้")
    }

    setBody("")
    setUrl("")

    onSubmit()
  }

  return (
    <div className="form-group text-2xl w-full h-full">
      <label className="" htmlFor="quote-body">
        เพิ่มวาทะสลิ่ม
      </label>

      <div className="w-full my-4">
        <label htmlFor="body" className="block font-medium text-gray-700">
          เนื้อหา
        </label>
        <div className="mt-1">
          <textarea
            id="body"
            name="body"
            rows={3}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full border border-gray-300 rounded-md"
            required={true}
            placeholder="วาทะสลิ่มที่คุณคิดว่าเจ๋ง (ความยาวไม่ควรเกิน 250 ตัวอักษร)"
            value={body}
            onChange={(event) => {
              setBody(event.target.value)
            }}
          ></textarea>
        </div>
      </div>

      <div className="w-full my-4">
        <label htmlFor="url" className="block font-medium text-gray-700">
          URL (ถ้ามี)
        </label>
        <div className="mt-1">
          <input
            id="url"
            name="url"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full border border-gray-300 rounded-md"
            placeholder="ถ้าไม่มี ให้เว้นว่างไว้"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value)
            }}
          ></input>
        </div>
      </div>

      <input
        type="submit"
        value="Submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        onClick={() => submitForm()}
        disabled={body.length == 0}
      />

      <button className="text-black py-2 px-4 rounded" onClick={onSubmit}>
        ยกเลิก
      </button>
    </div>
  )
}
