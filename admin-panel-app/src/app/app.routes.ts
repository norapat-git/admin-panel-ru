import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './core/guards/auth.guard';

// Dashboard
import { Dashboard } from './pages/dashboard/dashboard';

// 1. จัดการ กำหนดการสอบ
import { AcademicYear } from './pages/exam-setting/academic-year/academic-year';
import { SubjectsComponent } from './pages/exam-setting/subjects/subjects';
import { ExamRows } from './pages/exam-setting/exam-rows/exam-rows';
import { ExamSchedule } from './pages/exam-setting/exam-schedule/exam-schedule';

// 2. รายชื่อลงทะเบียน
import { RegisteredAll } from './pages/registration/registered-all/registered-all';
import { RegisteredPaid } from './pages/registration/registered-paid/registered-paid';
import { RegisteredBySchedule } from './pages/registration/registered-by-schedule/registered-by-schedule';
import { RegisteredSpecial } from './pages/registration/registered-special/registered-special';

// 3. รายงานการเงิน
import { PaymentStatus } from './pages/finance/payment-status/payment-status';
import { DailySummary } from './pages/finance/daily-summary/daily-summary';
import { DailyTotal } from './pages/finance/daily-total/daily-total';
import { GrandTotal } from './pages/finance/grand-total/grand-total';

// 4. จัดที่นั่งสอบ
import { SeatManagement } from './pages/seat-allocation/seat-management/seat-management';

// 5. ดาวน์โหลดไฟล์
import { DownloadSubjects } from './pages/download/download-subjects/download-subjects';
import { DownloadEtStdc } from './pages/download/download-et-stdc/download-et-stdc';
import { DownloadRu25et } from './pages/download/download-ru25et/download-ru25et';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'เข้าสู่ระบบ - E-Testing Backend'
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'exam-setting/subjects', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        component: Dashboard, 
        title: 'Home Control panel' 
      },
      
      // 1. จัดการ กำหนดการสอบ
      { 
        path: 'exam-setting/academic-year', 
        component: AcademicYear, 
        title: 'กำหนดปี/ภาค การศึกษา' 
      },
      { 
        path: 'exam-setting/subjects', 
        component: SubjectsComponent, 
        title: 'กำหนด วิชาที่เปิดสอบ - E-Testing Backend' 
      },
      { 
        path: 'exam-setting/exam-rows', 
        component: ExamRows, 
        title: 'กำหนด แถวสอบ' 
      },
      { 
        path: 'exam-setting/exam-schedule', 
        component: ExamSchedule, 
        title: 'กำหนดวันสอบ-คาบสอบ' 
      },

      // 2. รายชื่อลงทะเบียน
      { 
        path: 'registration/all', 
        component: RegisteredAll, 
        title: 'รายชื่อลงทะเบียนทั้งหมด' 
      },
      { 
        path: 'registration/paid', 
        component: RegisteredPaid, 
        title: 'รายชื่อลงทะเบียน ชำระเงินแล้ว' 
      },
      { 
        path: 'registration/by-schedule', 
        component: RegisteredBySchedule, 
        title: 'จำนวนนักศึกษาที่ลงทะเบียน/ตามวันสอบ-คาบสอบ' 
      },
      { 
        path: 'registration/special-students', 
        component: RegisteredSpecial, 
        title: 'จำนวนนักศึกษาพิเศษ/ตามวันสอบ-คาบสอบ' 
      },

      // 3. รายงานการเงิน
      { 
        path: 'finance/payment-status', 
        component: PaymentStatus, 
        title: 'สถานะการชำระเงิน' 
      },
      { 
        path: 'finance/daily-summary', 
        component: DailySummary, 
        title: 'พิมพ์สรุปเงินรายวัน' 
      },
      { 
        path: 'finance/daily-total', 
        component: DailyTotal, 
        title: 'พิมพ์สรุปเงินรวมรายวัน' 
      },
      { 
        path: 'finance/grand-total', 
        component: GrandTotal, 
        title: 'พิมพ์สรุปเงินรวมทั้งหมด' 
      },

      // 4. จัดที่นั่งสอบ
      { 
        path: 'seat-allocation/manage', 
        component: SeatManagement, 
        title: 'จัดที่นั่งสอบ' 
      },

      // 5. ดาวน์โหลดไฟล์
      { 
        path: 'download/subjects', 
        component: DownloadSubjects, 
        title: 'ดาวน์โหลด วิชาที่เปิดสอบ' 
      },
      { 
        path: 'download/et-stdc', 
        component: DownloadEtStdc, 
        title: 'ดาวน์โหลด ET_STDC' 
      },
      { 
        path: 'download/ru25et', 
        component: DownloadRu25et, 
        title: 'ดาวน์โหลด RU25et' 
      },

      { path: '**', redirectTo: 'exam-setting/subjects' }
    ]
  }
];
