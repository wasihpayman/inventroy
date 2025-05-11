import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = ({ can, inOutQty, inventoryValues, ...props }) => {
  // داده‌های نمونه فارسی‌سازی شده
  const rows = [
    {
      name: "محصول نمونه ۱",
      quantity: 150,
      baseUom: "کیلوگرم",
      lifespan: "31-60 روز",
      postingDate: "1402/05/15"
    },
    {
      name: "محصول نمونه ۲",
      quantity: 230,
      baseUom: "عدد",
      lifespan: "61-90 روز",
      postingDate: "1402/05/10"
    },
  ];

  // داده‌های ورودی فارسی‌سازی شده
  const dataInboundQty = [
    { name: "دریافت نشده", value: props.inboundQty?.OPEN || 0, color: "#f50057" },
    { name: "در انتظار ذخیره‌سازی", value: props.inboundQty?.PROCESS || 0, color: "#ff9800" },
    { name: "تکمیل شده", value: props.inboundQty?.CLOSE || 0, color: "#4caf50" },
  ];

  // داده‌های خروجی فارسی‌سازی شده
  const dataOutboundQty = [
    { name: "آماده‌سازی نشده", value: props.outboundQty?.OPEN || 0, color: "#f50057" },
    { name: "در حال آماده‌سازی", value: props.outboundQty?.PROCESS || 0, color: "#ff9800" },
    { name: "تحویل داده شده", value: props.outboundQty?.CLOSE || 0, color: "#4caf50" },
  ];

  // لیست انبارها
  const warehouses = [
    { label: "انبار مرکزی", value: "main" },
    { label: "انبار غرب", value: "west" },
    { label: "انبار شرق", value: "east" },
  ];

  // لیست مشتریان
  const clients = [
    { label: "مشتری عمومی", value: "public" },
    { label: "شرکت الف", value: "company_a" },
    { label: "شرکت ب", value: "company_b" },
  ];

  return (
    <Authenticated 
      title="داشبورد مدیریت انبار"
      header={
        <Typography variant="h5" component="h1" fontWeight="bold">
          داشبورد مدیریت انبار
        </Typography>
      }
    >
      <Head title="داشبورد" />

      {/* فیلترهای بالا */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Tooltip title="فیلتر بر اساس انبار" arrow>
          <Autocomplete
            disablePortal
            id="warehouse-filter"
            options={warehouses}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="انتخاب انبار" />
            )}
          />
        </Tooltip>

        <Tooltip title="فیلتر بر اساس مشتری" arrow>
          <Autocomplete
            disablePortal
            id="client-filter"
            options={clients}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="انتخاب مشتری" />
            )}
          />
        </Tooltip>
      </Box>

      {/* کارت‌های اصلی */}
      <Grid container spacing={3}>
        {/* نمودار وضعیت ورود کالا */}
        <Grid item xs={12} md={6}>
          <Tooltip title="وضعیت فعلی کالاهای ورودی به انبار" arrow>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6" gutterBottom>
                  وضعیت کالاهای ورودی
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  بر اساس تعداد اقلام
                </Typography>
              </Box>
              
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataInboundQty}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {dataInboundQty.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend 
                    wrapperStyle={{ fontSize: '12px' }}
                    formatter={(value) => <span style={{ fontSize: '12px' }}>{value}</span>}
                  />
                  <Tooltip 
                    formatter={(value) => [value, 'تعداد']}
                    labelFormatter={(label) => `وضعیت: ${label}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Tooltip>
        </Grid>

        {/* نمودار وضعیت خروج کالا */}
        <Grid item xs={12} md={6}>
          <Tooltip title="وضعیت فعلی کالاهای خروجی از انبار" arrow>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6" gutterBottom>
                  وضعیت کالاهای خروجی
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  بر اساس تعداد اقلام
                </Typography>
              </Box>
              
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataOutboundQty}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {dataOutboundQty.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend 
                    wrapperStyle={{ fontSize: '12px' }}
                    formatter={(value) => <span style={{ fontSize: '12px' }}>{value}</span>}
                  />
                  <Tooltip 
                    formatter={(value) => [value, 'تعداد']}
                    labelFormatter={(label) => `وضعیت: ${label}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Tooltip>
        </Grid>

        {/* نمودار سطح موجودی */}
        <Grid item xs={12} md={6}>
          <Tooltip title="تغییرات سطح موجودی در بازه زمانی مشخص" arrow>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6" gutterBottom>
                  سطح موجودی انبار
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  بر اساس تاریخ
                </Typography>
              </Box>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inventoryValues}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="posting_date"
                    angle={-30}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    label={{
                      value: 'تعداد',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 12 }
                    }}
                  />
                  <Tooltip 
                    formatter={(value) => [value, 'تعداد']}
                    labelFormatter={(label) => `تاریخ: ${label}`}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar 
                    dataKey="quantity" 
                    name="موجودی" 
                    fill="#2979ff" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Tooltip>
        </Grid>

        {/* نمودار تراکنش‌های انبار */}
        <Grid item xs={12} md={6}>
          <Tooltip title="مقایسه ورود و خروج کالاها" arrow>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6" gutterBottom>
                  تراکنش‌های انبار
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  مقایسه ورود و خروج
                </Typography>
              </Box>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inOutQty}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="posting_date"
                    angle={-30}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    label={{
                      value: 'تعداد',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 12 }
                    }}
                  />
                  <Tooltip 
                    formatter={(value) => [value, 'تعداد']}
                    labelFormatter={(label) => `تاریخ: ${label}`}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar 
                    dataKey="inbound" 
                    name="ورودی" 
                    fill="#4caf50" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="outbound" 
                    name="خروجی" 
                    fill="#f44336" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Tooltip>
        </Grid>

        {/* جدول موجودی قدیمی */}
        <Grid item xs={12}>
          <Tooltip title="لیست کالاهای با عمر انبارداری بالا" arrow>
            <Paper sx={{ p: 2 }}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6" gutterBottom>
                  کالاهای با عمر انبارداری بالا
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ۲۰ کالای با بیشترین مدت نگهداری در انبار
                </Typography>
              </Box>
              
              <TableContainer>
                <Table size="small" aria-label="جدول موجودی قدیمی">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>نام کالا</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">تاریخ ثبت</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">تعداد</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">واحد اندازه‌گیری</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">عمر انبارداری</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="center">{row.postingDate}</TableCell>
                        <TableCell align="center">{row.quantity.toLocaleString()}</TableCell>
                        <TableCell align="center">{row.baseUom}</TableCell>
                        <TableCell align="center">{row.lifespan}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Tooltip>
        </Grid>
      </Grid>
    </Authenticated>
  );
};

export default Dashboard;     