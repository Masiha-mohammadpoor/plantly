"use client";
import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import Input from "@/components/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignin } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

const Signin = () => {
  const router = useRouter();
  const { mutateAsync } = useSignin();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      const { message } = await mutateAsync({ ...data });
      toast.success(message);
      router.push("/");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <section className="w-screen flex px-4 md:px-0 justify-center">
      <article className="h-screen w-[50%] bg-primary-200 rounded-r-[120px] hidden lg:flex flex-col justify-center items-center">
        <h1 className="text-white text-6xl font-semibold pb-6">
          Welcome Back!
        </h1>
        <p className="max-w-80 break-words overflow-hidden text-center text-white pb-6">
          Enter your personal details to use all of site features
        </p>
        <h3 className="text-xl text-white pb-6">Or</h3>
        <Link href="/auth/signup">
          <button className="text-white cursor-pointer border-2 border-white rounded-lg py-1 px-7">
            SIGN UP
          </button>
        </Link>
      </article>
      <article className="w-full sm:w-[70%] lg:w-[50%] h-screen flex flex-col justify-center items-center ">
        <h2 className="text-2xl md:text-3xl font-semibold pb-3">
          Login To The Account
        </h2>
        <div className="flex gap-x-2 pb-3">
          <button className="cursor-not-allowed w-10 h-10 flex justify-center items-center border-2 border-secondary-500 rounded-lg text-secondary-500">
            <FaGoogle />
          </button>
          <button className="cursor-not-allowed w-10 h-10 flex justify-center items-center border-2 border-secondary-500 rounded-lg text-secondary-500">
            <FaGithub />
          </button>
          <button className="cursor-not-allowed w-10 h-10 flex justify-center items-center border-2 border-secondary-500 rounded-lg text-secondary-500">
            <FaLinkedinIn />
          </button>
        </div>
        <p className="text-secondary-500 text-sm pb-3">
          or use your email for login
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-full lg:w-[70%] flex flex-col items-center justify-center"
        >
          <Input
            register={register}
            errors={errors}
            name="email"
            placeholder="email..."
          />
          <Input
            register={register}
            errors={errors}
            name="password"
            placeholder="password..."
            type="password"
          />
          <button
            disabled={!isValid || !isDirty || isSubmitting}
            className="bg-primary-200 disabled:cursor-not-allowed disabled:bg-secondary-500 disabled:opacity-65 text-white rounded-lg cursor-pointer py-2 w-full"
            type="submit"
          >
            SIGN IN
          </button>
          <Link href="/auth/signup" className="text-primary-500 mt-4 lg:hidden">
            haven't registered yet ?
          </Link>
        </form>
      </article>
    </section>
  );
};

export default Signin;
