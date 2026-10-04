CREATE TABLE "mobile_money" (
	"user_id" text PRIMARY KEY,
	"operator" text DEFAULT '' NOT NULL,
	"number" text DEFAULT '' NOT NULL,
	"holder" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
