import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
//   TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getWeghingToday } from "@/services/apiServices";

interface TableComponentsProps {
  refresh: boolean;
//   setLoading: (loading: boolean) => void;
}

interface DataItem {
  kode_order: string;
  created_at: string;
  details: string;
  name: string;
}

interface GroupedData {
  [kode_order: string]: {
    tanggal: string;
    items: DataItem[];
  };
}

export const TableComponents: React.FC<TableComponentsProps> = ({refresh}) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString)
      .toLocaleDateString("id-ID", options)
      .replace(",", "");
  };

  const [groupedData, setGroupedData] = useState<GroupedData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status } = await getWeghingToday();
        if (status === 200) {
          const grouped = groupByKodeOrder(data);
          setGroupedData(grouped);
        //   setLoading(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refresh]);

  const groupByKodeOrder = (data: DataItem[]): GroupedData => {
    const grouped: GroupedData = {};
    data.forEach((item) => {
      const kodeOrder = item.kode_order;
      if (!grouped[kodeOrder]) {
        grouped[kodeOrder] = {
          tanggal: item.created_at,
          items: [],
        };
      }
      grouped[kodeOrder].items.push(item);
    });
    return grouped;
  };

  const columns = [
    {
      header: "Tanggal",
      key: "created_at",
      align: "left",
      render: (item: DataItem) => formatDate(item.created_at),
    },
    {
      header: "Produk",
      key: "name",
      align: "start",
    },
    {
      header: "Berat Timbang",
      key: "details",
      align: "right",
      render: (item: DataItem) => {
        const details = JSON.parse(item.details);
        return `${details.qty_weighing} ${details.noa_weighing}`;
      },
    },
    {
      header: "Jumlah",
      key: "details",
      align: "right",
      render: (item: DataItem) => {
        const details = JSON.parse(item.details);
        return `${details.number_of_item} ${details.noa_numberofitem}`;
      },
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Data Timbangan Hari Ini</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className="table-cell">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedData).map(([kodeOrder, group], index) => (
            <React.Fragment key={index}>
              <TableRow className="bg-gray-300 font-medium">
                <TableCell colSpan={columns.length}>Kode Order: {kodeOrder}</TableCell>
              </TableRow>
              {group.items.map((item, rowIndex) => (
                <TableRow key={rowIndex} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} className="table-cell">
                      {column.render ? column.render(item) : (item as any)[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
