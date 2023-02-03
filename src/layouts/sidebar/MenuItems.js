
const Menuitems = [
  {
    title: "แดชบอร์ด",
    icon: "home",
    href: "/Admin",
  },
  {
    title: "ผู้ใช้",
    icon: "users",
    href: "/Admin/users",
  },
  {
    title: "การจองเครื่องมือ",
    icon: "sidebar",
    href: "/Admin/dataBookings/[[...id]]",
  },
  {
    title: "ติดตามรายงานผลการทดสอบ",
    icon: "sidebar",
    href: "/Admin/Tracking/[[...id]]",
  },
  {
    title: "ข่าวประชาสัมพันธ์",
    icon: "plus-circle",
    href: "/Admin/createInfo/[[...id]]",
  },
  {
    title: "หมวดหมู่เครื่องมือ",
    icon: "type",
    href: "/Admin/categories",
  },
  {
    title: "เครื่องมือวิทยาศาสตร์",
    icon: "plus-circle",
    href: "/Admin/createProduct/[[...id]]",
  },
  
  
];

export default Menuitems;
