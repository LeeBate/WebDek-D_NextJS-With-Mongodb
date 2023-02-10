
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
    icon: "book-open",
    href: "/Admin/dataBookings/[[...id]]",
  },
  {
    title: "ติดตามรายงานผลการทดสอบ",
    icon: "map-pin",
    href: "/Admin/Tracking/[[...id]]",
  },
  {
    title: "ข่าวประชาสัมพันธ์",
    icon: "file-text",
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
