-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passport" TEXT,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "membershipID" TEXT NOT NULL,
    "membershipCategory" TEXT NOT NULL,
    "professionalLicenseID" TEXT,
    "yearOfLicense" TEXT,
    "stampIDNumber" TEXT,
    "sealIDNumber" TEXT,
    "specialization" TEXT,
    "countryOfOrigin" JSONB NOT NULL DEFAULT '{}',
    "countryOfResidence" JSONB NOT NULL DEFAULT '{}',
    "countryOfOperation" JSONB NOT NULL DEFAULT '{}',
    "educationQualification" JSONB NOT NULL DEFAULT '{}',
    "professionalQualification" JSONB NOT NULL DEFAULT '[]',
    "workExperience" JSONB NOT NULL DEFAULT '[]',
    "references" JSONB NOT NULL DEFAULT '[]',
    "occupation" TEXT,
    "operationalSector" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_key" ON "Membership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_email_key" ON "Membership"("email");

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
