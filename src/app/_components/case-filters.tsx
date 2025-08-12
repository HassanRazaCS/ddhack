"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function CaseFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value === "ALL") {
      params.delete(e.target.name);
    } else {
      params.set(e.target.name, e.target.value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Cases</CardTitle>
        <CardDescription>
          Filter cases by category, urgency, and location to find matches for
          your expertise.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Legal Category
            </label>
            <select
              name="legalCategory"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={handleFilterChange}
              defaultValue={searchParams.get("legalCategory") ?? "ALL"}
            >
              <option value="ALL">All Categories</option>
              <option>Family Law</option>
              <option>Immigration Law</option>
              <option>Criminal Defense</option>
              <option>Employment Law</option>
              <option>Housing Law</option>
              <option>Civil Rights</option>
              <option>Consumer Protection</option>
              <option>Disability Rights</option>
              <option>Elder Law</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Urgency Level
            </label>
            <select
              name="urgencyLevel"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={handleFilterChange}
              defaultValue={searchParams.get("urgencyLevel") ?? "ALL"}
            >
              <option value="ALL">All Levels</option>
              <option>LOW</option>
              <option>MEDIUM</option>
              <option>HIGH</option>
              <option>URGENT</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              name="country"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={handleFilterChange}
              defaultValue={searchParams.get("country") ?? "ALL"}
            >
              <option value="ALL">All Countries</option>
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Australia</option>
              <option>Germany</option>
              <option>France</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button
              className="w-full"
              onClick={() => router.replace(pathname)}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}