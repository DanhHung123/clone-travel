import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import PATH from "src/constants/path";

interface Props {
  formValue: Object;
  setFormValue: Function;
  setValid: number;
}

function FormCheckOut({ setFormValue, setValid, formValue }: Props) {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup
    .object({
      email: yup.string().required("Email is required").email("Email is not valid"),
      phone: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone is required"),
      customerName: yup.string().min(4).max(30).required("Password is required"),
      address: yup.string().min(8).max(30).required("Confirm Password is required")
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      customerName: formValue?.customerName || "",
      email: formValue.email || "",
      address: formValue.address || "",
      phone: formValue.phone || ""
    },
    resolver: yupResolver(schema)
  });

  const handleLoginForm = (data) => {
    setFormValue(data);
    setValid(true);
  };

  return (
    <>
      <form className="mt-4 text-textHeading  text-sm" onSubmit={handleSubmit(handleLoginForm)}>
        {/* fullname */}
        <div>
          <label className="font-normal cursor-text">FullName</label>
          <div className="relative mt-1 w-11/12 leading-4 h-10 rounded border border-[#B7BDC6]  hover:border-[#c99400]  mb-5 ">
            <input className="w-full h-full px-3 outline-none bg-transparent mb-[2px]" {...register("customerName")} />
            <small className="text-[#F6465D]"> {errors.customerName?.message}</small>
          </div>
        </div>
        {/* Email */}
        <div>
          <label className="font-normal cursor-text">Email</label>
          <div className="relative mt-1 w-11/12 leading-4 h-10 rounded border border-[#B7BDC6]  hover:border-[#c99400]  mb-5 ">
            <input className="w-full h-full px-3 outline-none bg-transparent mb-[2px]" {...register("email")} />
            <small className="text-[#F6465D]"> {errors.email?.message}</small>
          </div>
        </div>
        {/* phone */}
        <div>
          <label className="font-normal cursor-text">Phone Number</label>
          <div className="relative mt-1 w-11/12 leading-4 h-10 rounded border border-[#B7BDC6]  hover:border-[#c99400]  mb-5 ">
            <input className="w-full h-full px-3 outline-none bg-transparent mb-[2px]" {...register("phone")} />
            <small className="text-[#F6465D]"> {errors.phone?.message}</small>
          </div>
        </div>
        {/* address */}
        <div>
          <label className="font-normal cursor-text">Address</label>
          <div className="relative mt-1 w-11/12 leading-4 h-10 rounded border border-[#B7BDC6]  hover:border-[#c99400]  mb-5 ">
            <input className="w-full h-full px-3 outline-none bg-transparent mb-[2px]" {...register("address")} />
            <small className="text-[#F6465D]"> {errors.address?.message}</small>
          </div>
        </div>
        <button className=" py-3 w-11/12 rounded hover:bg-[#304c84] bg-primary text-white transition duration-200 ease-in">
          Method Payment
        </button>
      </form>

      {/* back to cart */}
      <Link to={PATH.cart}>
        <span className="text-primary mt-2 flex items-center decoration-solid underline text-base font-medium italic">
          Back to cart
        </span>
      </Link>
    </>
  );
}

export default FormCheckOut;
