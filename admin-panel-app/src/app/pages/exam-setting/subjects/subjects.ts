import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SubjectItem {
  id: number;
  sequenceNo: number;
  subjectCode: string;
  subjectName: string;
  credits: number;
  faculty: string;
  examType: string;
  status: 'เปิดสอบ' | 'ปิดรับ';
}

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subjects.html',
  styleUrl: './subjects.css'
})
export class SubjectsComponent {
  // Skeleton Loading state (toggleable)
  isLoading = signal(false);

  // Current term/year context
  currentTerm = signal('เทอม 1/2569');

  toggleLoading() {
    this.isLoading.update(v => !v);
  }

  // Search & Pagination signals
  searchTerm = signal('');
  pageSize = signal(10);
  currentPage = signal(1);
  sortColumn = signal<keyof SubjectItem>('sequenceNo');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Modal signals
  isModalOpen = signal(false);
  isEditMode = signal(false);
  modalSubject = signal<Partial<SubjectItem>>({
    sequenceNo: 1,
    subjectCode: '',
    subjectName: '',
    credits: 3,
    faculty: 'ศึกษาศาสตร์',
    examType: 'e-Testing',
    status: 'เปิดสอบ'
  });

  // Mock initial dataset
  subjectsList = signal<SubjectItem[]>([
    { id: 1, sequenceNo: 101, subjectCode: 'THA1003', subjectName: 'การเตรียมเพื่อการพูดและการเขียน', credits: 3, faculty: 'มนุษยศาสตร์', examType: 'e-Testing', status: 'เปิดสอบ' },
    { id: 2, sequenceNo: 102, subjectCode: 'ENG1001', subjectName: 'ประโยคภาษาอังกฤษพื้นฐานและศัพท์จำเป็น', credits: 3, faculty: 'มนุษยศาสตร์', examType: 'e-Testing', status: 'เปิดสอบ' },
    { id: 3, sequenceNo: 103, subjectCode: 'RAM1202', subjectName: 'ทักษะทางดิจิทัลและเทคโนโลยีสารสนเทศ', credits: 3, faculty: 'ศึกษาศาสตร์', examType: 'e-Testing', status: 'เปิดสอบ' },
    { id: 4, sequenceNo: 104, subjectCode: 'MTH1003', subjectName: 'คณิตศาสตร์พื้นฐาน', credits: 3, faculty: 'วิทยาศาสตร์', examType: 'e-Testing', status: 'เปิดสอบ' },
    { id: 5, sequenceNo: 105, subjectCode: 'LAW1101', subjectName: 'หลักกฎหมายมหาชน', credits: 3, faculty: 'นิติศาสตร์', examType: 'e-Testing', status: 'เปิดสอบ' },
    { id: 6, sequenceNo: 106, subjectCode: 'ACC1101', subjectName: 'การบัญชีขั้นต้น 1', credits: 3, faculty: 'บริหารธุรกิจ', examType: 'e-Testing', status: 'เปิดสอบ' },
    { id: 7, sequenceNo: 107, subjectCode: 'POL1101', subjectName: 'ทฤษฎีการเมืองและจริยธรรม', credits: 3, faculty: 'รัฐศาสตร์', examType: 'e-Testing', status: 'เปิดสอบ' },
    { id: 8, sequenceNo: 108, subjectCode: 'ECO1003', subjectName: 'เศรษฐศาสตร์ทั่วไป', credits: 3, faculty: 'เศรษฐศาสตร์', examType: 'e-Testing', status: 'เปิดสอบ' },
    { id: 9, sequenceNo: 109, subjectCode: 'PSY1001', subjectName: 'จิตวิทยาทั่วไป', credits: 3, faculty: 'ศึกษาศาสตร์', examType: 'e-Testing', status: 'เปิดสอบ' },
    { id: 10, sequenceNo: 110, subjectCode: 'SOC1003', subjectName: 'สังคมวิทยาและมานุษยวิทยา', credits: 3, faculty: 'รัฐศาสตร์', examType: 'e-Testing', status: 'เปิดสอบ' },
    { id: 11, sequenceNo: 111, subjectCode: 'HIS1001', subjectName: 'อารยธรรมโลกตะวันตก', credits: 3, faculty: 'มนุษยศาสตร์', examType: 'e-Testing', status: 'เปิดสอบ' },
    { id: 12, sequenceNo: 112, subjectCode: 'STA1003', subjectName: 'สถิติเบื้องต้น', credits: 3, faculty: 'วิทยาศาสตร์', examType: 'e-Testing', status: 'เปิดสอบ' },
    { id: 13, sequenceNo: 113, subjectCode: 'CSC1001', subjectName: 'วิทยาการคอมพิวเตอร์เบื้องต้น', credits: 3, faculty: 'วิทยาศาสตร์', examType: 'e-Testing', status: 'เปิดสอบ' },
    { id: 14, sequenceNo: 114, subjectCode: 'RAM1000', subjectName: 'ความรู้คู่คุณธรรม', credits: 3, faculty: 'ส่วนกลาง', examType: 'e-Testing', status: 'เปิดสอบ' }
  ]);

  // Filtered & Sorted items
  filteredSubjects = computed(() => {
    const query = this.searchTerm().toLowerCase().trim();
    let items = [...this.subjectsList()];

    if (query) {
      items = items.filter(item => 
        item.subjectCode.toLowerCase().includes(query) ||
        item.subjectName.toLowerCase().includes(query) ||
        item.sequenceNo.toString().includes(query) ||
        item.faculty.toLowerCase().includes(query)
      );
    }

    const col = this.sortColumn();
    const dir = this.sortDirection() === 'asc' ? 1 : -1;

    items.sort((a, b) => {
      const valA = a[col];
      const valB = b[col];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB) * dir;
      }
      return ((valA as number) > (valB as number) ? 1 : -1) * dir;
    });

    return items;
  });

  // Paged items
  pagedSubjects = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredSubjects().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.filteredSubjects().length / this.pageSize()));
  });

  totalCount = computed(() => this.subjectsList().length);
  filteredCount = computed(() => this.filteredSubjects().length);

  startEntryIndex = computed(() => {
    if (this.filteredCount() === 0) return 0;
    return (this.currentPage() - 1) * this.pageSize() + 1;
  });

  endEntryIndex = computed(() => {
    return Math.min(this.currentPage() * this.pageSize(), this.filteredCount());
  });

  // Sort Handler
  setSort(column: keyof SubjectItem) {
    if (this.sortColumn() === column) {
      this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  // Page Handler
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.pageSize.set(Number(target.value));
    this.currentPage.set(1);
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
    this.currentPage.set(1);
  }

  // CRUD Actions
  openAddModal() {
    this.isEditMode.set(false);
    const nextSeq = Math.max(...this.subjectsList().map(s => s.sequenceNo), 100) + 1;
    this.modalSubject.set({
      sequenceNo: nextSeq,
      subjectCode: '',
      subjectName: '',
      credits: 3,
      faculty: 'ศึกษาศาสตร์',
      examType: 'e-Testing',
      status: 'เปิดสอบ'
    });
    this.isModalOpen.set(true);
  }

  openEditModal(item: SubjectItem) {
    this.isEditMode.set(true);
    this.modalSubject.set({ ...item });
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  saveSubject() {
    const current = this.modalSubject();
    if (!current.subjectCode?.trim()) {
      alert('กรุณากรอกรหัสวิชา');
      return;
    }

    if (this.isEditMode()) {
      this.subjectsList.update(list => 
        list.map(s => s.id === current.id ? (current as SubjectItem) : s)
      );
    } else {
      const newItem: SubjectItem = {
        id: Date.now(),
        sequenceNo: Number(current.sequenceNo) || 1,
        subjectCode: current.subjectCode.toUpperCase().trim(),
        subjectName: current.subjectName?.trim() || 'วิชาใหม่',
        credits: Number(current.credits) || 3,
        faculty: current.faculty || 'ทั่วไป',
        examType: current.examType || 'e-Testing',
        status: current.status || 'เปิดสอบ'
      };
      this.subjectsList.update(list => [...list, newItem]);
    }
    this.closeModal();
  }

  deleteSubject(id: number, code: string) {
    if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบวิชา [${code}] ออกจากรายการเปิดสอบ?`)) {
      this.subjectsList.update(list => list.filter(s => s.id !== id));
    }
  }
}
