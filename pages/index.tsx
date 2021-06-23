import React from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";

/**
 * The form data to capture.
 */
interface IFormData {
  comments: string;
  email: string;
  file: FileList;
  name: string;
  org: string;
  ref: string;
  terms: boolean;
}

/**
 * Default component for the application.
 */
export default function Home() {
  const {
    formState: { errors, isSubmitSuccessful, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm();

  const onSubmit = async (data: IFormData) => {
    const date = new Date()
      .toISOString()
      .replaceAll(".", "")
      .replaceAll(":", "")
      .replaceAll("-", "");
    const file = data.file[0];
    const blob = file.slice(0, file.size, file.type);
    const renamedFile = new File([blob], `${date}.${file.name}`, { type: file.type });

    const request = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PRESIGN_URL}/${renamedFile.name}`);
      const url = await response.text();

      const put = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
      });

      if (put.status !== 200) {
        setError("file", {
          type: "server",
        });
      }
    };

    await request();
  };

  return (
    <>
      <Head>
        <title>Upload form</title>
        <meta key="title" content="Upload form" property="og:title" />
      </Head>

      {isSubmitting && (
        <div className="submitting">
          Submitting... please wait. Do not refresh or close your browser until the form has been
          submitted.
        </div>
      )}

      {isSubmitSuccessful && !isSubmitting && (
        <div className="success">
          Your information has been submitted successfully. We will get back to you.
        </div>
      )}

      {errors?.file?.type === "server" && (
        <div className="failure">We cannot upload your file. Try again later.</div>
      )}

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
            /* eslint-disable */
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            /* eslint-enable */
          })}
        />
        {errors?.email?.type === "required" && (
          <p className="error">Please provide your email address.</p>
        )}
        {errors?.email?.type === "pattern" && (
          <p className="error">Please provide a valid email address.</p>
        )}

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
        <textarea id="comments" rows={3} {...register("comments")} />
        {errors.age && (
          <p className="error">You Must be older then 18 and younger then 99 years old.</p>
        )}

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
