import React from 'react'
import Button from '@mui/material/Button';
import emailjs from "@emailjs/browser";
import Swal from 'sweetalert2'

export default function contactemail() {

 async function handleOnSubmit(e){
  e.preventDefault();
  const formData = {}
  Array.from(e.currentTarget.elements).forEach(field =>{
    if (!field.name) return;
    formData[field.name] = field.value;
  })
  fetch('api/mail',{
    method:'post',
    body: JSON.stringify(formData)

  })
  console.log(formData)
 }




 function sendEmail(e) {
  e.preventDefault();

emailjs.sendForm('service_8qhwn8r', 'template_a0nrq3h', e.target, 'urzLahGarV18K7U0b')
  .then((result) => {
      console.log(result.text);
  }, (error) => {
      console.log(error.text);
  });
  e.target.reset()
}
 function sendEmail2(e) {




  e.preventDefault();
  Swal.fire({
    title: 'คุณแน่ใจหรือไม่?',
    text: "การกระทำนี้ คุณจะไม่สามารถย้อนกลับได้!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ส่ง',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {

emailjs.sendForm('service_8qhwn8r', 'template_a0nrq3h', e.target, 'urzLahGarV18K7U0b')
  .then((result) => {
      console.log(result.text);
  }, (error) => {
      console.log(error.text);
  });
  e.target.reset()
      Swal.fire(
        'ส่งสำเร็จ!',
        'คำขอถูกดำเนินการแล้ว.',
        'success'
      )
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      // Toast.fire({
      //   icon: 'error',
      //   title: 'Signed in successfully'
      // })
    }
  })



}


  return (
  <center>
    <div className='flex flex-col  text-3xl font-bold mt-5'>ติดต่อ</div>

    <form method='post' onSubmit={sendEmail2}  >
    <p>
      <label htmlFor="title" className='mx-5'>เรื่องติดต่อ</label>
      <input className='border-2 border-black'  type="text" name='title'placeholder='เรื่องติดต่อ' ></input>
    </p>
     <p>
      <label  htmlFor="name" className='mx-5'>ชื่อ-สกุลผู้ติดต่อ</label>
      <input className='border-2 border-black' type="text" name='name' placeholder='ชื่อ-สกุลผู้ติดต่อ'></input>
    </p>
    <p>
      <label  htmlFor="email" className='mx-5'>อีเมล์</label>
      <input  className='border-2 border-black' type="text" name='email'placeholder='อีเมล์'></input>
    </p>
    <p>
      <label htmlFor="detail" className='mx-5'>รายละเอียด</label>
      <textarea  className='border-2 border-black'  type="text" name='detail'placeholder='รายละเอียด'></textarea>
    </p>
  <button className='px-3 py-2 bg-blue-500 rounded-md hover:bg-blue-400 text-white' type='submit'>submit</button>
    </form>

  </center>)
}
