import type { Duration } from "date-fns";
import { add, differenceInSeconds, secondsToMinutes } from "date-fns";

import type { Minutes, Seconds, TimeSpan } from "app/base/types";

export const timeSpanToDuration = (timeSpan: TimeSpan | null): Duration => {
  if (!timeSpan) {
    return {};
  }
  return {
    hours:
      Number(timeSpan.match(/([\d]+)\s*(?:hs?|hours?)\s*/)?.[1]) || undefined,
    minutes:
      Number(timeSpan.match(/([\d]+)\s*(?:ms?|mins?|minutes?)\s*/)?.[1]) ||
      undefined,
    seconds:
      Number(timeSpan.match(/([\d]+)\s*(?:s|secs?|seconds?)\s*/)?.[1]) ||
      undefined,
  };
};

const durationToSeconds = (duration: Duration): Seconds =>
  differenceInSeconds(add(new Date(), duration), new Date());

const durationToMinutes = (duration: Duration): Minutes =>
  secondsToMinutes(differenceInSeconds(add(new Date(), duration), new Date()));

export const timeSpanToSeconds = (timeSpan: TimeSpan | null): Seconds =>
  durationToSeconds(timeSpanToDuration(timeSpan));

export const timeSpanToMinutes = (timeSpan: TimeSpan | null): Minutes =>
  durationToMinutes(timeSpanToDuration(timeSpan));