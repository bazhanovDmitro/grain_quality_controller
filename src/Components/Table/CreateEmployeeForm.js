// import Modal from "../Modal/index";
// import Form from "../Form/index";
// import { ADD, ADD_EMPLOYEE } from "../../Constants/text";
// import { newUserSchema } from "../../Validation/createUser";

// const fields = [
//   {
//     type: "text",
//     name: "firstName",
//     initialValue: "",
//     placeholder: "First name",
//   },
//   {
//     type: "text",
//     name: "lastName",
//     initialValue: "",
//     placeholder: "Last name",
//   },
//   { type: "email", name: "email", initialValue: "", placeholder: "Email" },
//   {
//     type: "password",
//     name: "password",
//     initialValue: "",
//     placeholder: "Password",
//   },
// ];

// export default function CreateEmployeeForm({ isVisible, onClose, onCreate }) {
//   return isVisible ? (
//     <Modal onOtsideClick={onClose}>
//       <Form
//         fields={fields}
//         submitText={ADD}
//         onCancel={onClose}
//         validationSchema={newUserSchema}
//         formHeader={ADD_EMPLOYEE}
//       />
//     </Modal>
//   ) : null;
// }
