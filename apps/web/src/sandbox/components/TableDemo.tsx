import {
  AwTable,
  AwTableBody,
  AwTableCaption,
  AwTableCell,
  AwTableFooter,
  AwTableHead,
  AwTableHeader,
  AwTableRow,
} from "@/components/AwTable";

const INVOICES = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export const TableDemo = () => {
  return (
    <AwTable>
      <AwTableCaption i18nKey="sandbox:table.caption" />
      <AwTableHeader>
        <AwTableRow>
          <AwTableHead
            className="w-25"
            i18nKey="sandbox:table.header.invoice"
          />
          <AwTableHead i18nKey="sandbox:table.header.status" />
          <AwTableHead i18nKey="sandbox:table.header.method" />
          <AwTableHead
            i18nKey="sandbox:table.header.amount"
            className="text-right"
          />
        </AwTableRow>
      </AwTableHeader>
      <AwTableBody>
        {INVOICES.map(
          ({ invoice, paymentStatus, paymentMethod, totalAmount }) => (
            <AwTableRow key={invoice}>
              <AwTableCell className="font-medium">{invoice}</AwTableCell>
              <AwTableCell>{paymentStatus}</AwTableCell>
              <AwTableCell>{paymentMethod}</AwTableCell>
              <AwTableCell className="text-right">{totalAmount}</AwTableCell>
            </AwTableRow>
          ),
        )}
      </AwTableBody>
      <AwTableFooter>
        <AwTableRow>
          <AwTableCell colSpan={3} i18nKey="sandbox:table.total" />
          <AwTableCell className="text-right">$2,500.00</AwTableCell>
        </AwTableRow>
      </AwTableFooter>
    </AwTable>
  );
};
