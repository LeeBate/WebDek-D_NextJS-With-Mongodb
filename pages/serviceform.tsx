import type { NextPage } from 'next'
import {FormEvent, useState} from "react";
import Head from 'next/head';
import Swal from 'sweetalert2'
 import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber,isPossiblePhoneNumber } from 'react-phone-number-input'
import 'intl-tel-input/build/css/intlTelInput.css';
  import intlTelInput from 'intl-tel-input';
  import 'react-phone-number-input/style.css'

const Serviceform: NextPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [detail, setDetail] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(ConvertDate(Date.now())+" น.");

  

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let form = {
            title,
            email,
            name,
            phone,
            detail,
            date
        }

        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: "การกระทำนี้ คุณจะไม่สามารถย้อนกลับได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText:'ส่ง',
            cancelButtonText: 'ยกเลิก'
          }).then(async(result)  => {
            if (result.isConfirmed) {
                console.log(JSON.stringify(form))


                const rawResponse = await fetch('/api/submit', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });
                    console.log(form)
                const content = await rawResponse.json();

              Swal.fire(
                'ส่งสำเร็จ!',
        'คำขอถูกดำเนินการแล้ว.',
        'success'
              )
            }
          })


        
  

        // print to screen
        // alert(content.data.tableRange)

        // Reset the form fields
     
    }

   function handleChange(event) {
        setPhone( event.target.value);
      }

    function ConvertDate(date) {
        const data = new Date(date).toLocaleString("th-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        return data;
      }
    
    return (
    <div>
        {/* <main className="bg-gray-100 min-h-screen pt-20">
            <div className="max-w-5xl mx-auto py-16 ">
                <form className="py-4 space-y-4 " onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center">
                        <label htmlFor="title" className="sr-only">Name</label>
                        <input value={title} required onChange={e => setTitle(e.target.value)} type="text" name="title" id="title" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block   w-4/6 sm:text-md border-gray-300 rounded-md" placeholder="title" />
                    </div>
                    <div className="flex items-center justify-center">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">เรื่องติดต่อ</label>
                        <input value={email} required onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-4/6 sm:text-md border-gray-300 rounded-md" placeholder="email" />
                    </div>
                    <div className="flex items-center justify-center">
                        <label htmlFor="name" className="sr-only">Phone</label>
                        <input value={name} required onChange={e => setName(e.target.value)} type="text" name="name" id="name" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-4/6 sm:text-md border-gray-300 rounded-md" placeholder="name" />
                    </div>
                    <div className="flex items-center justify-center">
                        <label htmlFor="phone" className="sr-only">Message</label>
                        <input value={phone} required onChange={e => setPhone(e.target.value)} id="phone" type="tel" name="phone" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-4/6 sm:text-md border-gray-300 rounded-md" placeholder="phone" />
                    </div> 
                    <div className="flex items-center justify-center">
                        <label htmlFor="message" className="sr-only">Message</label>
                        <textarea value={detail} required onChange={e => setDetail(e.target.value)} id="detail" name="detail" className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-4/6 sm:text-md border-gray-300 rounded-md" placeholder="detail" />
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="flex items-center justify-center text-sm w-64 rounded-md shadow py-3 px-2 text-white bg-indigo-600">Save</button>
                    </div>
                </form>
            </div>
        </main> */}

<Head><title>CALLLAB</title></Head>
<section className="bg-white">




<p className="pt-16"></p>

<div className="grid grid-cols-1 xl:grid-cols-4 grid-rows-2 gap-3 h-[100vh] w-full ">
	<div  className="hidden xl:block "></div>
	<div className=" h-full w-full row-span-2 col-span-2">
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md mt-0">
  <h2 className="mb-4 text-2xl md:text-3xl lg:text:3xl xl:text-4xl tracking-tight font-extrabold text-center text-gray-900">แบบฟอร์มขอรับบริการ</h2>
  {/* <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-md">หากไม่ดูเป็นการรบกวนกูจะชวนเธอมารักกัน</p> */}
  <form method='post' onSubmit={handleSubmit}  className="space-y-4">
      <div>
          <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">เรื่องติดต่อ</label>
          <input value={title} required onChange={e => setTitle(e.target.value)} type="text" name="title" id="title" className="shadow-sm bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-900 
          text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
          block w-full p-2.5 " placeholder="เรื่อง..." />
      </div>
      <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">อีเมล์</label>
          <input value={email} required onChange={e => setEmail(e.target.value)} type="email" name="email" id="email"
          className="shadow-sm bg-gray-50 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 
          text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
          block w-full p-2.5 " placeholder="Suranaree@g.sut.ac.th" />
      </div>
      <div>
          <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">ชื่อ-นามสกุล</label>
          <input value={name} required onChange={e => setName(e.target.value)} type="text" name="name" id="name"  className="shadow-sm bg-gray-50 border focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 text-gray-900 
          text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
          block w-full p-2.5 " placeholder="นายเทคโน สุรนารี" />
      </div>    
      <div>
          <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">เบอร์โทรติดต่อ</label>
          {/* <input value={phone} required onChange={e => setPhone(e.target.value)} id="phone" type="text" name="phone"  className="shadow-sm bg-gray-50 border focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 text-gray-900 
          text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
          block w-full p-2.5 " placeholder="นายเทคโน สุรนารี" /> */}
           <PhoneInput
      className='phoneInput border-2 pl-2 bg-[#f9fafb] rounded-md '
      defaultCountry='TH'
      required
  placeholder="หมายเลขโทรศัพท์"
  value={phone}
  onChange={phone=> setPhone(phone)}/>
      </div>
      <div className="sm:col-span-2">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">รายละเอียดที่ต้องการ</label>
          <textarea   rows={6} value={detail} required onChange={e => setDetail(e.target.value)} id="detail" name="detail" className="block p-2.5 w-full focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300  " placeholder="เขียนรายละเอียด..." ></textarea>
      </div>
       <div hidden>
          <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">เบอร์โทรติดต่อ</label>
          <input value={ConvertDate(Date.now())+" น."} required onChange={e => setDate(e.target.value)} id="date" type="text" name="date"  className="shadow-sm bg-gray-50 border focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 text-gray-900 
          text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
          block w-full p-2.5 " placeholder="นายเทคโน สุรนารี" />
      </div>
     

      <button type="submit" className="shadow-sm bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-green-500 rounded
          block w-full p-1" >ส่งแบบฟอร์ม</button>
          {/* <img className='w-full h-[500px] object-fill' src={"/images/Artboard 1.1.png"} /> */}
      
     </form>
    </div>
    </div>
	<div  className="hidden xl:block "></div>
	<div className="hidden xl:block  mt-4"><img className='' src={"/images/1_2.1.png"} /></div>
	<div className="hidden xl:block    mt-1 "><img className='' src={"/images/2_3.png"} /></div>
</div>



</section>







  </div> 

   )
}

export default Serviceform