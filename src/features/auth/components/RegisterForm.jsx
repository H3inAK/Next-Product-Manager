"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ your_name, your_email, password, country }) => {
    console.log(your_email, your_name, country);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[380px] bg-background shadow-xl px-8 py-5 flex flex-col gap-3 rounded">
        <h2 className="text-2xl text-center font-bold mb-2">
          Student Register Form
        </h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="your_name">Your Name</Label>
          <Input
            type="text"
            id="your_name"
            {...register("your_name", {
              required: true,
              pattern: /^[a-zA-Z\s]+$/,
            })}
          />
          {errors.your_name && (
            <p className="text-red-600 text-sm">{errors.your_name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="your_email">Your Email</Label>
          <Input
            type={`email`}
            id="your_email"
            {...register("your_email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.your_email && (
            <p className="text-red-600 text-sm">{errors.your_email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="country">Choose Your Country</Label>
          <Select
            id="country"
            name="country"
            onValueChange={(value) => setValue("country", value)}
          >
            <SelectTrigger className={`w-full`}>
              <SelectValue placeholder="Select your country"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mm">Myanmar"</SelectItem>
              <SelectItem value="jp">Japan"</SelectItem>
              <SelectItem value="kr">Korea"</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type={`password`}
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: 8,
              maxLength: 20,
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirm_password">Confirm Password</Label>
          <Input
            type={`password`}
            id="confirm_password"
            {...register("confirm_password", {
              required: true,
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          {errors.confirm_password && (
            <p className="text-sm text-red-600">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 mt-2">
          <Checkbox
            id="terms"
            {...register("terms", {
              required: true,
            })}
          />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <div className="mt-4 mb-2">
          <Button variant={""} className={`w-full h-10`}>
            Register Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
