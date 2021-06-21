import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import Head from "next/head";

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
    <>
      <Head>
        <title>Upload form</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register("name", {
            required: true,
          })}
        />
        {errors?.name?.type === "required" && <p className="error">Please provide your name.</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors?.email?.type === "required" && <p className="error">Please provide your email address.</p>}
        {errors?.email?.type === "pattern" && <p className="error">Please provide a valid email address.</p>}

        <label htmlFor="org">Organisation ID</label>
        <input
          id="org"
          {...register("org", {
            required: true,
            minLength: 3,
            maxLength: 3,
          })}
        />
        {errors?.org && <p className="error">Your Organisation ID is 3 characters.</p>}

        <label htmlFor="comments">Comments</label>
        <textarea id="comments" rows="3" {...register("comments")} />
        {errors.age && <p className="error">You Must be older then 18 and younger then 99 years old.</p>}

        <label htmlFor="ref">Reference number</label>
        <input id="ref" {...register("ref", { minLength: 4, max: 4 })} />
        {errors.ref && <p className="error">Your reference number is 4 characters.</p>}

        <label htmlFor="file">Add file</label>
        <input id="file" type="file" {...register("file")} />

        <label htmlFor="terms">Agree to the terms and conditions</label>
        <input id="terms" type="checkbox" {...register("terms", { required: true })} />
        {errors?.terms && <p className="error">Please agree to the terms and conditions.</p>}

        <input type="submit" />
      </form>
    </>
  );
}
