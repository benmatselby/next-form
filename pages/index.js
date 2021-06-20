import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input
        {...register("name", {
          required: true,
        })}
      />
      {errors?.name?.type === "required" && <p>Please provide your name.</p>}

      <label>Email</label>
      <input
        type="text"
        {...register("email", {
          required: true,
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
      {errors?.email?.type === "required" && <p>Please provide your email address.</p>}
      {errors?.email?.type === "pattern" && <p>Please provide a valid email address.</p>}

      <label>Organisation ID</label>
      <input
        {...register("org", {
          required: true,
          minLength: 3,
          maxLength: 3,
        })}
      />
      {errors?.org && <p>You Organisation ID is 3 characters</p>}

      <label>Comments</label>
      <textarea rows="5" {...register("comments")} />
      {errors.age && <p>You Must be older then 18 and younger then 99 years old</p>}

      <label>Reference number</label>
      <input {...register("ref", { minLength: 4, max: 4 })} />
      {errors.ref && <p>You Organisation ID is 3 characters</p>}

      <label>Add file</label>
      <input type="file" {...register("file")} />

      <label>Agree to the terms and conditions</label>
      <input type="checkbox" {...register("terms", { required: true })} />
      {errors?.terms && <p>Please agree to the terms and conditions</p>}

      <input type="submit" />
    </form>
  );
}
