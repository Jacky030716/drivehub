CREATE TABLE IF NOT EXISTS "hub_participants" (
	"hub_id" uuid,
	"user_id" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hub_participants" ADD CONSTRAINT "hub_participants_hub_id_hubs_id_fk" FOREIGN KEY ("hub_id") REFERENCES "public"."hubs"("id") ON DELETE CASCADE ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hub_participants" ADD CONSTRAINT "hub_participants_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "hubs" DROP COLUMN IF EXISTS "participants";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_matric_number_unique" UNIQUE("matric_number");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");