"use client";

import Link from "next/link";
import PageShell from "@/components/PageShell";
import { Field } from "@/components/Forms";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "@/app/actions/auth-actions";
import Script from "next/script";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="button" disabled={pending} style={{marginTop: 15}}>
      {pending ? "Logging in..." : "Log in"}
    </button>
  );
}

export const runtime = 'edge';

export default function Login() {
  const [state, action] = useFormState(loginAction, undefined);

  return (
    <PageShell>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <section className="auth">
        <form action={action} className="auth-card">
          <small className="eyebrow">WELCOME BACK</small>
          <h1>Log in</h1>
          {state?.error && <div className="notice" style={{ color: "red" }}>{state.error}</div>}
          <Field name="email" label="Email" placeholder="you@example.com" type="email" />
          <Field name="password" label="Password" placeholder="••••••••" type="password" />
          
          <div className="cf-turnstile" data-sitekey="1x00000000000000000000AA" style={{marginTop: 10}}></div>
          
          <SubmitButton />
          <Link href="/forgot-password">Forgot password?</Link>
          <p>New here? <Link href="/register">Create an account</Link></p>
        </form>
      </section>
    </PageShell>
  );
}