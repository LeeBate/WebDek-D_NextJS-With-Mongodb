import React from 'react'

 function services() {
  return (
    <div id="services" className="services-container">
    <div className="service-header">
        <h2 className=' text-lg font-bold md:text-xl lg:text-4xl'>บริการวิเคราะห์ทดสอบ</h2>
        <p className='text-base font-medium md:text-lg'>ศูนย์เครื่อมือวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยเทคโนโลยี</p>
    </div>
          
    <div className="service-card-container">
        <div className="service-cards">
          <a href='/service1'>
          <i aria-hidden className="fas m1">
            <img aria-hidden className="fas  h-18 w-18" src={"/images/Artboard 5.png"}/>
          </i>
            <h3>บริการวิเคราะห์ด้วยกล้องจุลทรรศน์</h3>
            <p>วิเคราะห์ทดสอบโดยคล้องถ่ายภาพสมรรถนะสูง รวมถึงวิเคราะห์ธาตุต่าง ๆ ด้วยกล้องจุลทรรศน์อิเล็กตรอน และกล้องจุลทรรศน์แสง</p>
          </a>
        </div>
        <div className="service-cards">
          <a href='/service2'>
            <i aria-hidden className="fas m2">
            <img aria-hidden className="fas  h-18 w-18" src={"/images/Artboard 6.png"}/>
            </i>
            <h3>บริการวิเคราะห์ทางเคมีและชีวเคมี</h3>
            <p>วิเคราะห์ธาตุ สารประกอบ และโครงสร้าง ด้วยเทคนิคต่าง ๆ โดยใช้เครื่องมือวิเคราะห์ขั้นสูง</p></a>
        </div>
        <div className="service-cards">
          <a href='#'>
        <i aria-hidden className="fas m3">
            <img aria-hidden className="fas  h-18 w-18" src={"/images/Artboard 7.png"}/>
            </i>
            <h3>บริการวิเคราะห์ทางจุลชีววิทยา</h3>
            <p>ตรวจวิเคราะห์หาจุลินทรีย์ในตัวอย่างน้ำ ตัวอย่างอาหาร และตัวอย่างอื่น ๆ อย่างมีมาตรฐาน</p></a>
        </div>
        <div className="service-cards">
          <a href='#'>
        <i aria-hidden className="fas m4">
            <img aria-hidden className="fas  h-18 w-18" src={"/images/Artboard 8.png"}/>
            </i>
            <h3>บริการทดสอบทางกายภาพ</h3>
            <p>วิเคราะห์พื้นผิวและความพรุน ความชื้นและเถ้า วัดขนาดอนุภาค หาพลังงานของตัวอย่าง ด้วยเครื่องมือวิเคราะห์ทดสอบที่หลากหลาย</p></a>
        </div>
        <div className="service-cards">
          <a href='#'>
        <i aria-hidden className="fas m5">
            <img aria-hidden className="fas  h-18 w-18" src={"/images/Artboard 9.png"}/>
            </i>
            <h3>บริการวิเคราะห์น้ำ</h3>
            <p>ตรวจวิเคราะห์น้ำประเภทต่าง ๆ เช่น นํ้าดื่ม น้ำเสีย ด้วยวิธีตามมาตรฐานสากล</p></a>
        </div>
    </div>
    <section className='mt-[50px]'>
      <p>55555555</p>
    </section>
</div>
  )
}
export default services