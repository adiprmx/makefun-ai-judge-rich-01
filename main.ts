// Make the AI judge rich: a plan an AI agent can follow with $100, a computer
// with internet access and 30 days, written to /output/entry.txt.
//
// The plan sells done-for-you Google Business and review pages to local
// trades, sample-first at $49 prepaid: the work is shown before any money is
// asked, the niche is narrow, every step is code the agent runs itself, and
// the numbers are honest about the likely outcome, not the best case.
//
// The gate takes UTF-8 text of 1 to 1,000 characters that is not only white
// space, and the judge reads exactly the bytes written, so this program
// refuses to write a plan outside that range. It runs twice with no network
// and both runs must write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const MIN_CHARS = 1;
const MAX_CHARS = 1000;

/** The plan, one line per beat, joined with single line ends. */
function buildPlan(): string {
  const beats = [
    'Plan: sell done-for-you Google Business and review pages to local trades, sample-first, $49 prepaid.',
    'Day 1: build a one-page offer site and a Stripe payment link; list 3,000 plumbers, electricians and roofers with thin or unclaimed Google listings from public directories; generate each a live sample page with its name, services and a review link.',
    "Days 2-30: email 100 a day, one-to-one, each with its own sample link: 'Your page is ready. $49 to keep it live, money-back if no new review in 14 days.' Every message carries an opt-out.",
    'Days 6-30: deliver every paid page the same day with code; ask each buyer for one referral; once 5 sales prove the channel, spend $30 on a $5/day ad to the same niche.',
    'Math: 2,900 emails at a 1% buy rate = 29 sales x $49 = $1,421; costs about $30, so expect $1,000-1,400 by day 30. At a 0.3% rate it is still about $425.',
    'Rules: keep $40 in reserve; stop any channel with no sale after 300 sends; no client over 10% of revenue; refund the same day, no questions.',
  ];
  return beats.join('\n');
}

const plan = buildPlan();
const chars = [...plan].length;
if (chars < MIN_CHARS || chars > MAX_CHARS) {
  throw new Error(`plan is ${chars} characters, the gate takes ${MIN_CHARS} to ${MAX_CHARS}`);
}
if (plan.trim().length === 0) {
  throw new Error('plan must hold at least one character that is not white space');
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'entry.txt'), plan, 'utf8');
