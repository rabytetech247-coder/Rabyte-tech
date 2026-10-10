"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitReviewAction } from "@/app/actions/review-actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="button" disabled={pending} style={{ padding: "8px 16px", fontSize: 13 }}>
      {pending ? "Submitting..." : "Submit Review"}
    </button>
  );
}

export default function ReviewForm({ productId }: { productId: string }) {
  const [state, action] = useFormState(submitReviewAction, undefined);

  return (
    <form action={action} style={{ marginTop: 25, background: "#f9f9f9", padding: 20, borderRadius: 8, border: "1px solid var(--bd)" }}>
      <h3>Write a Review</h3>
      {state?.error && <div style={{ color: "red", fontSize: 13, marginBottom: 10 }}>{state.error}</div>}
      
      <input type="hidden" name="productId" value={productId} />
      
      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: "bold", marginBottom: 5 }}>Rating (1-5)</label>
        <select name="rating" required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid var(--bd)" }}>
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Good</option>
          <option value="3">3 - Average</option>
          <option value="2">2 - Poor</option>
          <option value="1">1 - Terrible</option>
        </select>
      </div>

      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: "bold", marginBottom: 5 }}>Review Text</label>
        <textarea name="reviewText" rows={3} placeholder="What did you think of this product?" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid var(--bd)", fontFamily: "inherit" }}></textarea>
      </div>

      <SubmitButton />
    </form>
  );
}
