CREATE TABLE IF NOT EXISTS "group_participants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hub_id" uuid NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_participants" ADD CONSTRAINT "group_participants_hub_id_hubs_id_fk" FOREIGN KEY ("hub_id") REFERENCES "public"."hubs"("id") ON DELETE CASCADE ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_participants" ADD CONSTRAINT "group_participants_email_user_email_fk" FOREIGN KEY ("email") REFERENCES "public"."user"("email") ON DELETE CASCADE ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
