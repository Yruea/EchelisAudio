---
title: The signup form that did nothing
log: 1
date: 2026-11-14
tag: Site
summary: Our early-access form said "You're on the list" and saved nothing. Here is what was wrong and what we changed.
---

## Observation

The early-access form on our first site showed a success message every time. It stored nothing and sent nothing. The contact form had the same fault.

## Cause

The site was exported from an app builder. The export kept the form but not the service behind it, so the code fell back to a stand-in that always reported success.

## Change

- Both forms now send to a real inbox, and show an error if sending fails.
- We removed a "percent reserved" counter from the product page. It was not based on real numbers.
- We removed a cable connector claim that had not been decided.

## Note

If you signed up before 14 November 2026, we did not receive it. Please sign up again.

## Rule from now on

Nothing on this site reports a number, a spec or a success that we cannot back up.
