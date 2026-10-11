"use client";

import { useEffect, useRef, useState } from "react";

export type UseCopyToClipboardOptions = {
  copiedDuration?: number;
};

export const useCopyToClipboard = ({
  copiedDuration = 3000,
}: UseCopyToClipboardOptions = {}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const scopeGenerationRef = useRef(0);

  useEffect(
    () => () => {
      scopeGenerationRef.current += 1;
      if (copiedTimerRef.current === undefined) return;

      clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = undefined;
    },
    [],
  );

  const copyToClipboard = async (value: string) => {
    if (copiedTimerRef.current !== undefined) {
      clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = undefined;
    }
    setIsCopied(false);

    if (!value) {
      throw new Error("Cannot copy an empty value.");
    }
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      throw new Error("Clipboard API is not available in this environment.");
    }

    const scopeGeneration = scopeGenerationRef.current;
    await navigator.clipboard.writeText(value);
    if (scopeGeneration !== scopeGenerationRef.current) return;

    setIsCopied(true);
    copiedTimerRef.current = setTimeout(() => {
      copiedTimerRef.current = undefined;
      setIsCopied(false);
    }, copiedDuration);
  };

  return { isCopied, copyToClipboard };
};
