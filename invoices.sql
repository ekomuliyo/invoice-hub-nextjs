/*
 Navicat Premium Dump SQL

 Source Server         : neon.tech
 Source Server Type    : PostgreSQL
 Source Server Version : 170004 (170004)
 Source Host           : ep-dry-field-a1qf308e-pooler.ap-southeast-1.aws.neon.tech:5432
 Source Catalog        : neondb
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170004 (170004)
 File Encoding         : 65001

 Date: 21/02/2025 22:21:06
*/


-- ----------------------------
-- Table structure for invoices
-- ----------------------------
DROP TABLE IF EXISTS "public"."invoices";
CREATE TABLE "public"."invoices" (
  "id" int4 NOT NULL DEFAULT nextval('invoices_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "number" varchar(255) COLLATE "pg_catalog"."default",
  "due_date" date,
  "amount" float4,
  "status" varchar(25) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."invoices" OWNER TO "neondb_owner";

-- ----------------------------
-- Primary Key structure for table invoices
-- ----------------------------
ALTER TABLE "public"."invoices" ADD CONSTRAINT "invoices_pkey" PRIMARY KEY ("id");
