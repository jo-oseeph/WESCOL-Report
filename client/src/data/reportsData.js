// Dummy static data for the WEKSCOL Report prototype.
// Structure: Category -> Subcategory -> Report
//
// Every report viewer always shows two standard filter groups regardless of
// what's defined here: the Plant/Region/Zone/Section/Sublocation/Village
// location filter, and a Date From / Date To range. `parameters` below only
// holds EXTRA fields that are specific to that particular report.

const extraFilters = {
  department: {
    name: "department",
    label: "Department",
    type: "select",
    options: ["All", "Nucleus Estate", "Outgrowers", "Head Office"],
  },
  status: {
    name: "status",
    label: "Status",
    type: "select",
    options: ["All", "Pending", "Approved", "Completed"],
  },
};

function buildResults(columns, rowCount, rowFactory) {
  const rows = [];
  for (let i = 1; i <= rowCount; i++) {
    rows.push(rowFactory(i));
  }
  return { columns, rows };
}

function makeReport(name, description, params, results) {
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name,
    description,
    parameters: params,
    results,
  };
}

export const reportCategories = [
  {
    id: "agriculture",
    name: "Agriculture",
    description: "Field operations, land preparation and cane development reports.",
    subcategories: [
      {
        id: "lead-to-service",
        name: "Lead to Service",
        reports: [
          makeReport(
            "Lease Report",
            "Summary of farmer land lease agreements currently active with the company.",
            [extraFilters.status],
            buildResults(
              ["Lease No.", "Farmer Name", "Zone", "Acreage", "Status"],
              6,
              (i) => [`LSE-${1000 + i}`, `Farmer ${i}`, ["Zone A", "Zone B", "Zone C"][i % 3], `${(i * 2.4).toFixed(1)} ha`, ["Active", "Pending", "Active"][i % 3]]
            )
          ),
          makeReport(
            "Business Partner Conversion",
            "Tracks conversion of prospective leads into registered business partners (outgrowers).",
            [],
            buildResults(
              ["Lead ID", "Name", "Stage", "Zone", "Conversion Date"],
              6,
              (i) => [`LD-${200 + i}`, `Prospect ${i}`, ["New", "Qualified", "Converted"][i % 3], ["Zone A", "Zone B"][i % 2], `2025-0${(i % 9) + 1}-1${i}`]
            )
          ),
          makeReport(
            "Field Scouting",
            "Field scouting visit records for pest, disease and crop condition monitoring.",
            [],
            buildResults(
              ["Field ID", "Scout Officer", "Zone", "Condition", "Visit Date"],
              6,
              (i) => [`FLD-${300 + i}`, `Officer ${i}`, ["Zone A", "Zone B", "Zone C"][i % 3], ["Good", "Fair", "Needs Attention"][i % 3], `2025-0${(i % 9) + 1}-0${i}`]
            )
          ),
          makeReport(
            "E-Contracting",
            "Digital cane supply contracts signed with outgrowers and nucleus farmers.",
            [extraFilters.status],
            buildResults(
              ["Contract No.", "Farmer Name", "Tonnage (Est.)", "Status", "Signed Date"],
              6,
              (i) => [`ECT-${400 + i}`, `Farmer ${i}`, `${i * 12} MT`, ["Signed", "Draft", "Signed"][i % 3], `2025-0${(i % 9) + 1}-2${i % 8}`]
            )
          ),
        ],
      },
      {
        id: "activity-completion",
        name: "Activity Completion",
        reports: [
          makeReport(
            "Land Preparation Report",
            "Progress of land clearing, ploughing and harrowing activities per field.",
            [],
            buildResults(
              ["Field ID", "Activity", "% Complete", "Zone", "Last Updated"],
              5,
              (i) => [`FLD-${500 + i}`, ["Ploughing", "Harrowing", "Ridging"][i % 3], `${(i * 17) % 100}%`, ["Zone A", "Zone B"][i % 2], `2025-0${(i % 9) + 1}-1${i}`]
            )
          ),
          makeReport(
            "Planting Activity Report",
            "Tracks cane planting progress against seasonal planting targets.",
            [],
            buildResults(
              ["Field ID", "Variety", "Area Planted", "Target", "Zone"],
              5,
              (i) => [`FLD-${600 + i}`, ["KEN 82-247", "CO 421", "N14"][i % 3], `${i * 3} ha`, `${i * 4} ha`, ["Zone A", "Zone C"][i % 2]]
            )
          ),
          makeReport(
            "Fertilizer Application Report",
            "Fertilizer application schedules and completion status by field.",
            [extraFilters.status],
            buildResults(
              ["Field ID", "Fertilizer Type", "Qty Applied (kg)", "Status", "Zone"],
              5,
              (i) => [`FLD-${700 + i}`, ["DAP", "CAN", "NPK"][i % 3], `${i * 150}`, ["Completed", "In Progress"][i % 2], ["Zone A", "Zone B"][i % 2]]
            )
          ),
          makeReport(
            "Harvest Readiness Report",
            "Identifies fields approaching harvest maturity for scheduling purposes.",
            [],
            buildResults(
              ["Field ID", "Age (Months)", "Estimated Yield", "Zone", "Ready Date"],
              5,
              (i) => [`FLD-${800 + i}`, `${12 + i}`, `${i * 8} MT/ha`, ["Zone B", "Zone C"][i % 2], `2025-1${i % 2}-0${i}`]
            )
          ),
        ],
      },
    ],
  },
  {
    id: "transport",
    name: "Transport",
    description: "Cane haulage, fleet, logistics and dispatch reports.",
    subcategories: [
      {
        id: "cane-haulage",
        name: "Cane Haulage",
        reports: [
          makeReport(
            "Daily Haulage Report",
            "Daily summary of cane tonnage hauled from field to factory.",
            [],
            buildResults(
              ["Trip No.", "Truck No.", "Tonnage", "Origin Zone", "Date"],
              6,
              (i) => [`TRP-${100 + i}`, `KDA ${100 + i}Z`, `${i * 9} MT`, ["Zone A", "Zone B"][i % 2], `2025-06-0${i}`]
            )
          ),
          makeReport(
            "Truck Utilization Report",
            "Utilization rates of the haulage fleet against available capacity.",
            [],
            buildResults(
              ["Truck No.", "Trips", "Capacity Used", "Idle Hours"],
              6,
              (i) => [`KDA ${100 + i}Z`, `${i * 2}`, `${(i * 13) % 100}%`, `${i}h`]
            )
          ),
          makeReport(
            "Route Efficiency Report",
            "Compares planned versus actual route times for haulage trips.",
            [],
            buildResults(
              ["Route", "Planned Time", "Actual Time", "Variance"],
              5,
              (i) => [`Route ${i}`, `${i + 1}h 00m`, `${i + 1}h ${i * 5}m`, `+${i * 5}m`]
            )
          ),
        ],
      },
      {
        id: "fleet-management",
        name: "Fleet Management",
        reports: [
          makeReport(
            "Vehicle Maintenance Report",
            "Scheduled and completed maintenance records for transport vehicles.",
            [extraFilters.status],
            buildResults(
              ["Vehicle No.", "Maintenance Type", "Status", "Last Service"],
              5,
              (i) => [`KDA ${200 + i}Z`, ["Service", "Tyre Change", "Inspection"][i % 3], ["Completed", "Scheduled"][i % 2], `2025-0${i}-1${i}`]
            )
          ),
          makeReport(
            "Fuel Consumption Report",
            "Fuel usage per vehicle against distance covered.",
            [],
            buildResults(
              ["Vehicle No.", "Distance (km)", "Fuel Used (L)", "L/100km"],
              5,
              (i) => [`KDA ${200 + i}Z`, `${i * 120}`, `${i * 38}`, `${(31 + i).toFixed(1)}`]
            )
          ),
          makeReport(
            "Driver Performance Report",
            "Driver trip counts, punctuality and safety incident summary.",
            [],
            buildResults(
              ["Driver", "Trips", "On-Time %", "Incidents"],
              5,
              (i) => [`Driver ${i}`, `${i * 4}`, `${90 + i}%`, `${i % 2}`]
            )
          ),
        ],
      },
      {
        id: "logistics-dispatch",
        name: "Logistics & Dispatch",
        reports: [
          makeReport(
            "Daily Dispatch Report",
            "Products dispatched to customers and distributors per day.",
            [],
            buildResults(
              ["Dispatch No.", "Customer", "Product", "Qty (MT)"],
              5,
              (i) => [`DSP-${600 + i}`, `Customer ${i}`, ["Sugar 50kg", "Molasses"][i % 2], `${i * 6}`]
            )
          ),
          makeReport(
            "Dispatch Delay Report",
            "Flags dispatch orders that exceeded the standard turnaround time.",
            [],
            buildResults(
              ["Dispatch No.", "Customer", "Delay (Hrs)", "Reason"],
              5,
              (i) => [`DSP-${700 + i}`, `Customer ${i}`, `${i * 2}h`, ["Truck Availability", "Documentation"][i % 2]]
            )
          ),
          makeReport(
            "Stock Movement Report",
            "Inbound and outbound stock movement across warehouses.",
            [],
            buildResults(
              ["Warehouse", "Product", "Inbound (MT)", "Outbound (MT)"],
              5,
              (i) => [`WH-${i}`, ["Sugar", "Molasses", "Bagasse"][i % 3], `${i * 12}`, `${i * 9}`]
            )
          ),
          makeReport(
            "Warehouse Utilization Report",
            "Storage capacity utilization by warehouse location.",
            [],
            buildResults(
              ["Warehouse", "Capacity (MT)", "Used (MT)", "Utilization %"],
              5,
              (i) => [`WH-${i}`, `${i * 500}`, `${i * 340}`, `${(i * 68) % 100}%`]
            )
          ),
        ],
      },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    description: "Payables, receivables, ledger, commercial control and procurement reports.",
    subcategories: [
      {
        id: "accounts-payable",
        name: "Accounts Payable",
        reports: [
          makeReport(
            "Vendor Payment Report",
            "Summary of payments made to vendors within a selected period.",
            [extraFilters.status],
            buildResults(
              ["Voucher No.", "Vendor", "Amount (KES)", "Status"],
              6,
              (i) => [`VCH-${900 + i}`, `Vendor ${i}`, `${(i * 45210).toLocaleString()}`, ["Paid", "Pending"][i % 2]]
            )
          ),
          makeReport(
            "Outstanding Invoices Report",
            "Lists supplier invoices that remain unpaid, grouped by ageing bracket.",
            [],
            buildResults(
              ["Invoice No.", "Vendor", "Amount (KES)", "Days Outstanding"],
              5,
              (i) => [`INV-${300 + i}`, `Vendor ${i}`, `${(i * 22150).toLocaleString()}`, `${i * 15}`]
            )
          ),
        ],
      },
      {
        id: "accounts-receivable",
        name: "Accounts Receivable",
        reports: [
          makeReport(
            "Customer Statement Report",
            "Account statement showing invoices, receipts and running balance per customer.",
            [],
            buildResults(
              ["Customer", "Invoice No.", "Amount (KES)", "Balance"],
              5,
              (i) => [`Customer ${i}`, `INV-${400 + i}`, `${(i * 31500).toLocaleString()}`, `${(i * 5200).toLocaleString()}`]
            )
          ),
          makeReport(
            "Aging Report",
            "Receivables grouped into 30/60/90-day ageing buckets.",
            [],
            buildResults(
              ["Customer", "0-30 Days", "31-60 Days", "61-90 Days", "90+ Days"],
              5,
              (i) => [`Customer ${i}`, `${i * 1200}`, `${i * 800}`, `${i * 300}`, `${i * 100}`]
            )
          ),
        ],
      },
      {
        id: "general-ledger",
        name: "General Ledger",
        reports: [
          makeReport(
            "Trial Balance Report",
            "Debit and credit balances across all general ledger accounts.",
            [],
            buildResults(
              ["Account Code", "Account Name", "Debit (KES)", "Credit (KES)"],
              5,
              (i) => [`GL-${1000 + i}`, `Account ${i}`, `${(i * 15000).toLocaleString()}`, `${(i * 9000).toLocaleString()}`]
            )
          ),
          makeReport(
            "Journal Entry Report",
            "List of journal entries posted within a selected period.",
            [],
            buildResults(
              ["JE No.", "Description", "Amount (KES)", "Posted By"],
              5,
              (i) => [`JE-${500 + i}`, `Adjustment ${i}`, `${(i * 7400).toLocaleString()}`, `User ${i}`]
            )
          ),
        ],
      },
      {
        id: "commercial-control",
        name: "Commercial Control",
        reports: [
          makeReport(
            "Sales Summary Report",
            "High-level sales volumes and revenue summary across products.",
            [],
            buildResults(
              ["Product", "Qty Sold (MT)", "Revenue (KES)", "Zone"],
              5,
              (i) => [["Sugar 50kg", "Molasses", "Bagasse"][i % 3], `${i * 40}`, `${(i * 520000).toLocaleString()}`, ["Zone A", "Zone B"][i % 2]]
            )
          ),
          makeReport(
            "Customer Sales Report",
            "Sales performance broken down by individual customer accounts.",
            [],
            buildResults(
              ["Customer", "Orders", "Total Value (KES)"],
              5,
              (i) => [`Customer ${i}`, `${i * 3}`, `${(i * 61000).toLocaleString()}`]
            )
          ),
          makeReport(
            "Price List Report",
            "Current approved price list for finished products.",
            [extraFilters.status],
            buildResults(
              ["Product", "Unit Price (KES)", "Effective Date", "Status"],
              5,
              (i) => [["Sugar 50kg", "Sugar 25kg", "Molasses"][i % 3], `${5200 + i * 100}`, `2025-0${i}-01`, "Active"]
            )
          ),
          makeReport(
            "Discount Analysis Report",
            "Discounts issued to customers and their impact on net revenue.",
            [],
            buildResults(
              ["Customer", "Discount %", "Amount Discounted (KES)"],
              5,
              (i) => [`Customer ${i}`, `${i * 2}%`, `${(i * 8300).toLocaleString()}`]
            )
          ),
        ],
      },
      {
        id: "procurement",
        name: "Procurement",
        reports: [
          makeReport(
            "Open Purchase Orders Report",
            "Purchase orders that have been raised but not yet fully delivered.",
            [extraFilters.status],
            buildResults(
              ["PO No.", "Supplier", "Amount (KES)", "Status"],
              5,
              (i) => [`PO-${800 + i}`, `Supplier ${i}`, `${(i * 76000).toLocaleString()}`, ["Open", "Partially Received"][i % 2]]
            )
          ),
          makeReport(
            "PO Approval Status Report",
            "Tracks purchase orders through the internal approval workflow.",
            [],
            buildResults(
              ["PO No.", "Requested By", "Approval Stage", "Status"],
              5,
              (i) => [`PO-${900 + i}`, `User ${i}`, ["Level 1", "Level 2", "Final"][i % 3], ["Pending", "Approved"][i % 2]]
            )
          ),
          makeReport(
            "Supplier Performance Report",
            "Delivery timeliness and quality rating per supplier.",
            [],
            buildResults(
              ["Supplier", "On-Time Delivery %", "Quality Rating"],
              5,
              (i) => [`Supplier ${i}`, `${85 + i}%`, `${(3 + (i % 2)).toFixed(1)} / 5`]
            )
          ),
          makeReport(
            "Supplier Contract Report",
            "Active and expiring supplier contract agreements.",
            [extraFilters.status],
            buildResults(
              ["Contract No.", "Supplier", "Expiry Date", "Status"],
              5,
              (i) => [`SC-${100 + i}`, `Supplier ${i}`, `2025-1${i % 2}-0${i}`, ["Active", "Expiring Soon"][i % 2]]
            )
          ),
        ],
      },
    ],
  },
  {
    id: "factory",
    name: "Factory",
    description: "Sugar production and quality control reports.",
    subcategories: [
      {
        id: "production",
        name: "Production",
        reports: [
          makeReport(
            "Daily Production Report",
            "Daily sugar output, cane crushed and production efficiency.",
            [],
            buildResults(
              ["Date", "Cane Crushed (MT)", "Sugar Produced (MT)", "Efficiency %"],
              5,
              (i) => [`2025-06-0${i}`, `${i * 320}`, `${i * 34}`, `${(i * 9 + 50) % 100}%`]
            )
          ),
          makeReport(
            "Sugar Recovery Report",
            "Recovery rate of sugar extracted per tonne of cane crushed.",
            [],
            buildResults(
              ["Date", "Cane Crushed (MT)", "Recovery Rate %"],
              5,
              (i) => [`2025-06-0${i}`, `${i * 300}`, `${(9 + i * 0.2).toFixed(2)}%`]
            )
          ),
          makeReport(
            "Milling Efficiency Report",
            "Performance metrics for each milling train in the factory.",
            [],
            buildResults(
              ["Mill No.", "Throughput (MT/hr)", "Downtime (Hrs)", "Efficiency %"],
              5,
              (i) => [`Mill ${i}`, `${i * 45}`, `${i}h`, `${(i * 7 + 60) % 100}%`]
            )
          ),
        ],
      },
      {
        id: "quality-control",
        name: "Quality Control",
        reports: [
          makeReport(
            "Quality Inspection Report",
            "Product quality inspection results against set standards.",
            [extraFilters.status],
            buildResults(
              ["Batch No.", "Product", "Result", "Status"],
              5,
              (i) => [`BATCH-${i}`, "Sugar 50kg", ["Pass", "Pass", "Review"][i % 3], ["Approved", "Pending"][i % 2]]
            )
          ),
          makeReport(
            "Sucrose Content Report",
            "Laboratory readings of sucrose content per production batch.",
            [],
            buildResults(
              ["Batch No.", "Sucrose %", "Purity %", "Sampled At"],
              5,
              (i) => [`BATCH-${i}`, `${(98 + i * 0.1).toFixed(1)}%`, `${(99 + i * 0.05).toFixed(2)}%`, `2025-06-0${i}`]
            )
          ),
        ],
      },
    ],
  },
  {
    id: "hr",
    name: "HR",
    description: "Payroll and workforce management reports.",
    subcategories: [
      {
        id: "payroll",
        name: "Payroll",
        reports: [
          makeReport(
            "Monthly Payroll Report",
            "Consolidated payroll costs across departments for the selected month.",
            [extraFilters.department],
            buildResults(
              ["Employee No.", "Department", "Gross Pay (KES)", "Net Pay (KES)"],
              5,
              (i) => [`EMP-${2000 + i}`, ["Nucleus Estate", "Head Office", "Outgrowers"][i % 3], `${(i * 42000).toLocaleString()}`, `${(i * 35000).toLocaleString()}`]
            )
          ),
          makeReport(
            "Overtime Report",
            "Overtime hours worked and cost incurred by department.",
            [extraFilters.department],
            buildResults(
              ["Employee No.", "Department", "OT Hours", "OT Cost (KES)"],
              5,
              (i) => [`EMP-${2100 + i}`, ["Nucleus Estate", "Head Office"][i % 2], `${i * 4}`, `${(i * 1800).toLocaleString()}`]
            )
          ),
        ],
      },
      {
        id: "workforce",
        name: "Workforce",
        reports: [
          makeReport(
            "Staff Attendance Report",
            "Daily attendance and absenteeism summary by department.",
            [extraFilters.department],
            buildResults(
              ["Employee No.", "Department", "Days Present", "Days Absent"],
              5,
              (i) => [`EMP-${2200 + i}`, ["Nucleus Estate", "Outgrowers"][i % 2], `${20 - i}`, `${i}`]
            )
          ),
          makeReport(
            "Leave Balance Report",
            "Remaining annual leave balances per employee.",
            [extraFilters.department],
            buildResults(
              ["Employee No.", "Department", "Leave Days Used", "Leave Days Remaining"],
              5,
              (i) => [`EMP-${2300 + i}`, ["Head Office", "Nucleus Estate"][i % 2], `${i * 2}`, `${21 - i * 2}`]
            )
          ),
        ],
      },
    ],
  },
];

// Flat helper used by the Overview page for "recently used" style widgets.
export const recentlyUsedReports = [
  { name: "Daily Production Report", category: "Factory", lastRun: "Today, 08:12 AM" },
  { name: "Daily Haulage Report", category: "Transport", lastRun: "Today, 07:40 AM" },
  { name: "Vendor Payment Report", category: "Finance", lastRun: "Yesterday, 04:55 PM" },
  { name: "Sales Summary Report", category: "Finance", lastRun: "Yesterday, 02:10 PM" },
  { name: "Staff Attendance Report", category: "HR", lastRun: "2 days ago" },
];

export function getTotalReportCount() {
  return reportCategories.reduce((total, category) => {
    const subReportCount = category.subcategories.reduce(
      (sum, sub) => sum + sub.reports.length,
      0
    );
    return total + subReportCount;
  }, 0);
}

export function getTotalSubcategoryCount() {
  return reportCategories.reduce((total, category) => total + category.subcategories.length, 0);
}
