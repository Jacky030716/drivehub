CREATE TYPE "public"."share_with" AS ENUM('Private', 'Student', 'Lecturer', 'Others');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hubs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"session" text NOT NULL,
	"semester" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"owner_email" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "link_share_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link_id" uuid NOT NULL,
	"shared_email" text,
	"shared_hub_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"ref_name" text NOT NULL,
	"description" text NOT NULL,
	"semester" text NOT NULL,
	"session" text NOT NULL,
	"category" text NOT NULL,
	"share_with" "share_with" DEFAULT 'Private' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"owner_email" text,
	"hub_id" uuid,
	CONSTRAINT "links_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"email" text PRIMARY KEY NOT NULL,
	"matric_number" text NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_matric_number_unique" UNIQUE("matric_number")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hubs" ADD CONSTRAINT "hubs_owner_email_user_email_fk" FOREIGN KEY ("owner_email") REFERENCES "public"."user"("email") ON DELETE CASCADE ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "link_share_details" ADD CONSTRAINT "link_share_details_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE CASCADE ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "link_share_details" ADD CONSTRAINT "link_share_details_shared_hub_id_hubs_id_fk" FOREIGN KEY ("shared_hub_id") REFERENCES "public"."hubs"("id") ON DELETE CASCADE ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "links" ADD CONSTRAINT "links_owner_email_user_email_fk" FOREIGN KEY ("owner_email") REFERENCES "public"."user"("email") ON DELETE CASCADE ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "links" ADD CONSTRAINT "links_hub_id_hubs_id_fk" FOREIGN KEY ("hub_id") REFERENCES "public"."hubs"("id") ON DELETE CASCADE ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
