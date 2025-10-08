import React from 'react'
import "./Faq.css"
import { Accordion, AccordionItem } from '@szhsin/react-accordion';

export default function Faq() {
  const faqs = [
  {
    question: "Is this service free?",
    answer: "Yes! Our Twitter video downloader is completely free to use with no hidden charges or subscription fees.",
  },
  {
    question: "Do I need to sign up or create an account?",
    answer: "No account required! Simply paste the Twitter video URL and download instantly.",
  },
  {
    question: "What video quality can I download?",
    answer: "You can download videos in the highest quality available, up to 1080p HD, depending on the original video quality.",
  },
  {
    question: "Is it safe to use?",
    answer: "Absolutely! We don't store your data or the videos. Your downloads are processed securely and privately.",
  },
  {
    question: "Can I download videos from private accounts?",
    answer: "No, you can only download videos from public Twitter accounts due to privacy restrictions.",
  },
  {
    question: "Are there any download limits?",
    answer: "No limits! Download as many videos as you want, whenever you want.",
  },
];


  return (
    <>
        <h2 className="faq-header">
            Frequently Asked <span className="faq-header-hilight">Questions</span>
        </h2>
        <p className="h6">
            Everything you need to know about our service
        </p>

   <Accordion>
      {faqs.map(({ question, answer }, i) => (
        <AccordionItem header={question} key={i}>
          {answer}
        </AccordionItem>
      ))}
    </Accordion>
    </>
  )
}
