import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const OPEN_CODE_SERVE_COMMAND =
  "opencode serve --hostname 127.0.0.1 --port 4096";

export function OpenCodeServeCommand() {
  const { t } = useTranslation();
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleCopy = async () => {
    try {
      await copyToClipboard(OPEN_CODE_SERVE_COMMAND);
    } catch (error) {
      console.error("Unable to copy the OpenCode server command.", error);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 rounded-md border border-border bg-muted/50 px-3 py-2.5">
      <p className="text-xs font-medium text-muted-foreground">
        {t("authentication.serveCommandLabel")}
      </p>
      <div className="flex min-w-0 items-start gap-2 rounded-md border border-border/60 bg-background/60 p-2">
        <pre className="m-0 min-w-0 flex-1 overflow-hidden whitespace-pre-wrap break-all py-1 font-mono text-xs leading-relaxed text-foreground">
          <code>{OPEN_CODE_SERVE_COMMAND}</code>
        </pre>
        <Button
          aria-label={t("thread.copy")}
          className="shrink-0"
          onClick={handleCopy}
          size="icon-sm"
          title={t("thread.copy")}
          type="button"
          variant="ghost"
        >
          {isCopied ? (
            <CheckIcon aria-hidden="true" />
          ) : (
            <CopyIcon aria-hidden="true" />
          )}
        </Button>
      </div>
    </div>
  );
}
