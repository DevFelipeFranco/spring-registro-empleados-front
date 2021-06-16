import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../core/services/report/reports.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  MIME_TYPES = {
    pdf: 'application/pdf',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
  };

  constructor(private readonly reportService: ReportsService) { }

  ngOnInit(): void {
  }

  generarReporte(): void {
    console.log('Se generara el reporte');
    this.reportService.generarReporte().subscribe(data => {
      saveAs(
        new Blob([data],
        {type: this.MIME_TYPES['application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet']}), 'prueba.xlsx');
    });
  }

}
