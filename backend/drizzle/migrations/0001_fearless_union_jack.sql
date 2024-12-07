ALTER TABLE "feedback" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "hubs" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;