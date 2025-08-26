"use client";
import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import Input from "@/components/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks/useAuth";
import toast from "react-hot-toast";

const schema = yup
  .object({
    name: yup
      .string()
      .required("Name is required")
      .min(6, "Name must be at least 6 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    repeatPassword: yup
      .string()
      .required("Password repetition is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const Signup = () => {
  const router = useRouter();
  const { mutateAsync } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const onSubmit = async (data) => {
    try {
      const { message } = await mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success(message);
      router.push("/");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <section className="flex">
      <article className="h-screen w-[50%] bg-primary-200 rounded-r-[120px] flex flex-col justify-center items-center">
        <h1 className="text-white text-6xl font-semibold pb-6">Welcome!</h1>
        <p className="max-w-80 break-words overflow-hidden text-center text-white pb-6">
          Welcome to our site. Register to use all the features.
        </p>
        <h3 className="text-xl text-white pb-6">Or</h3>
        <Link href="/auth/signin">
          <button className="text-white cursor-pointer border-2 border-white rounded-lg py-1 px-7">
            SIGN IN
          </button>
        </Link>
      </article>
      <article className="w-[50%] h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-semibold pb-3">Create Account</h2>
        <div className="flex gap-x-2 pb-3">
          <button className="cursor-pointer w-10 h-10 flex justify-center items-center border-2 border-secondary-500 rounded-lg text-secondary-500">
            <FaGoogle />
          </button>
          <button className="cursor-pointer w-10 h-10 flex justify-center items-center border-2 border-secondary-500 rounded-lg text-secondary-500">
            <FaGithub />
          </button>
          <button className="cursor-pointer w-10 h-10 flex justify-center items-center border-2 border-secondary-500 rounded-lg text-secondary-500">
            <FaLinkedinIn />
          </button>
        </div>
        <p className="text-secondary-500 text-sm pb-3">
          or use your email for registration
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center"
        >
          <Input
            errors={errors}
            register={register}
            name="name"
            placeholder="name..."
          />
          <Input
            errors={errors}
            register={register}
            name="email"
            placeholder="email..."
          />
          <Input
            errors={errors}
            register={register}
            name="password"
            placeholder="password..."
            type="password"
          />
          <Input
            errors={errors}
            register={register}
            name="repeatPassword"
            placeholder="repeat password..."
            type="password"
          />
          <button
            disabled={!isValid || !isDirty || isSubmitting}
            className="bg-primary-200 disabled:cursor-not-allowed disabled:bg-secondary-500 disabled:opacity-65 text-white rounded-lg cursor-pointer py-2 w-full"
            type="submit"
          >
            SIGN UP
          </button>
        </form>
      </article>
    </section>
  );
};

export default Signup;
