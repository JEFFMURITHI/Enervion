// src/components/forms/NewsletterSignup.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import api from "@/utils/api";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/newsletter", { email });
      toast({ title: "Subscribed!", description: "You have successfully joined our newsletter." });
      setEmail("");
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to subscribe.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <Input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Subscribe"}
      </Button>
    </form>
  );
};

export default NewsletterSignup;
