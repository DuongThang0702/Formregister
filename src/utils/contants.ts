import icon from "./icon";
import { Routes } from "./path";

export const checkBoxTrainingSystem = [
  {
    id: 1,
    content: "Quản lý Khách sạn",
    value: "QLKS",
  },
  {
    id: 2,
    content: "Quan hệ Công chúng",
    value: "QHCC",
  },
  {
    id: 3,
    content: "Quản lý đơn hàng",
    value: "QLDH",
  },
  {
    id: 4,
    content: "Quản lý dịch vụ Du lịch & Lữ hành",
    value: "DL&LH",
  },
  {
    id: 5,
    content: "Phiên dịch Tiếng Anh thương mại",
    value: "English",
  },
  {
    id: 6,
    content: "Phiên dịch Tiếng Nhật Kinh tế thương mại",
    value: "Japanese",
  },
  {
    id: 7,
    content: "Tiếng Hàn Quốc",
    value: "Korean",
  },
  {
    id: 8,
    content: "Thiết kế Độ họa",
    value: "GD",
  },
  {
    id: 9,
    content: "Thiết kế Nội thất",
    value: "ID",
  },
  {
    id: 10,
    content: "Thiết kế Thời trang",
    value: "FD",
  },
  {
    id: 11,
    content: "Quản lý Khách sạn",
    value: "HM",
  },
  {
    id: 12,
    content: "Dược",
    value: "Pharmacy",
  },
  {
    id: 13,
    content: "Điều dưỡng",
    value: "Nursing",
  },
  {
    id: 14,
    content: "CNTT - Thiết kế Website",
    value: "WD",
  },
  {
    id: 15,
    content: "CNTT - Ứng dụng Phần mềm",
    value: "SA",
  },
  {
    id: 16,
    content: "Khác",
    value: "other",
  },
];
export const tabSystem = [
  {
    id: 1,
    icon: icon.faNewspaper,
    title: "Thu thập hồ sơ",
    path: `/${Routes.FORM}`,
  },
  {
    id: 2,
    icon: icon.faPhoneVolume,
    title: "Tư vấn",
    path: `/`,
  },
  {
    id: 3,
    icon: icon.faSchool,
    title: "Nhập học",
    path: `/`,
  },
  {
    id: 4,
    icon: icon.faFolderOpen,
    title: "Quản lý hồ sơ",
    path: `/${Routes.QUAN_LY_HO_SO}?page=1`,
  },
];
export const tabSidebarAdmin = [
  {
    id: 1,
    title: "Dashbard",
    type: "single",
    icon: icon.faHouse,
    path: `/${Routes.ADMIN}/${Routes.DASHBOARD}`,
  },
  {
    id: 2,
    title: "User",
    icon: icon.faPeopleGroup,
    type: "parent",
    child: [
      {
        id: 3,
        title: "Create",
        icon: icon.faUserPlus,
        type: "single",
        path: `/${Routes.ADMIN}/${Routes.USER}/${Routes.CREATE_USER}`,
      },
      {
        id: 4,
        title: "Manage",
        type: "single",
        icon: icon.faUsers,
        path: `/${Routes.ADMIN}/${Routes.USER}/${Routes.MANAGE_USER}`,
      },
    ],
  },
];

export const fieldsAdminUser = [
  {
    id: 1,
    title: "#",
  },
  {
    id: 2,
    title: "Email",
  },
  {
    id: 3,
    title: "hoTen",
  },
  {
    id: 4,
    title: "Role",
  },
  {
    id: 6,
    title: "Password",
  },
  {
    id: 5,
    title: "So dien thoai",
  },

  {
    id: 7,
    title: "Action",
    center: true,
  },
];

export const fieldsTableQl = [
  {
    id: 1,
    title: "#",
  },
  {
    id: 2,
    title: "Họ tên",
  },
  {
    id: 3,
    title: "Điện thoại",
  },
  {
    id: 4,
    title: "Hệ đào tạo",
  },
  {
    id: 5,
    title: "Ngành quan tâm",
  },
];
