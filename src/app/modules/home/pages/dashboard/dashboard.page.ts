import { Component, OnInit } from '@angular/core';
import { DialogFormService } from '@app/core/services/dialog-form.service';

declare let particlesJS: any;
@Component({
  selector: 'ag-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(private dialogFormService: DialogFormService) {}
  showSettingDialog = false;

  ParticlesConfig = {
    particles: {
      number: {
        value: localStorage.getItem('number') || 80,
        density: {
          enable: false,
          value_area: 1400,
        },
      },
      color: {
        value: localStorage.getItem('color') || '#283593',
      },
      shape: {
        type: localStorage.getItem('shape') || 'triangle',
        stroke: {
          width: localStorage.getItem('strokeWidth') || 1,
          color: localStorage.getItem('strokeColor') || '#283593',
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: true,
          speed: 0.8,
          opacity_min: 0.25,
          sync: true,
        },
      },
      size: {
        value: 2,
        random: true,
        anim: {
          enable: true,
          speed: 10,
          size_min: 1.25,
          sync: true,
        },
      },
      line_linked: {
        enable: localStorage.getItem('enableLines') || true,
        distance: localStorage.getItem('lineGravity') || 150,
        color: localStorage.getItem('lineColor') || '#283593',
        opacity: localStorage.getItem('lineOpacity') || 1,
        width: localStorage.getItem('lineWidth') || 1,
      },
      move: {
        enable: true,
        speed: localStorage.getItem('speed') || 8,
        direction: localStorage.getItem('direction') || 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: true,
        attract: {
          enable: true,
          rotateX: 2000,
          rotateY: 2000,
        },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: localStorage.getItem('onHoverMode') || 'repulse',
        },
        onclick: {
          enable: true,
          mode: localStorage.getItem('onClickMode') || 'push',
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: localStorage.getItem('mouseBubbleGravity') || 100,
          size: localStorage.getItem('bubbleSize') || 100,
          opacity: localStorage.getItem('bubbleOpacity') || 0.5,
        },
        grab: {
          distance: localStorage.getItem('mouseLineGravity') || 200,
          line_linked: {
            opacity: 3,
          },
        },
        repulse: {
          distance: 250,
          duration: 2,
        },
      },
    },
    retina_detect: true,
  };
  ngOnInit() {
    particlesJS('particles-js', this.ParticlesConfig, () => {});
  }

  showSetting() {
    this.dialogFormService
      .show('تنظیمات', [
        {
          type: 'dropdown',
          label: 'هنگام hover',
          labelWidth: 200,
          dropdownItems: [
            { label: 'حباب', value: 'bubble' },
            { label: 'دافعه', value: 'repulse' },
            { label: 'خطوط', value: 'grab' },
          ],
          value: localStorage.getItem('onHoverMode') || 'repulse',
          formControlName: 'onHoverMode',
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'dropdown',
          label: 'هنگام click',
          labelWidth: 200,
          dropdownItems: [
            { label: 'حباب', value: 'bubble' },
            { label: 'افزودن', value: 'push' },
          ],
          value: localStorage.getItem('onClickMode') || 'push',
          formControlName: 'onClickMode',
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'text',
          label: 'جاذبه خطوط با ماوس (0-1500)',
          labelWidth: 200,
          formControlName: 'mouseLineGravity',
          value: localStorage.getItem('mouseLineGravity') || 200,
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'text',
          label: 'جاذبه حباب با ماوس (0-1500)',
          labelWidth: 200,
          formControlName: 'mouseBubbleGravity',
          value: localStorage.getItem('mouseBubbleGravity') || 100,
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'text',
          label: 'ازدحام (0-600)',
          labelWidth: 200,
          formControlName: 'number',
          value: localStorage.getItem('number') || 80,
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'dropdown',
          label: 'شکل نقاط',
          labelWidth: 200,
          dropdownItems: [
            { label: 'مثلث', value: 'triangle' },
            { label: 'مربع', value: 'edge' },
            { label: 'پنج ضلعی', value: 'polygon' },
            { label: 'ستاره', value: 'star' },
            { label: 'دایره', value: 'circle' },
          ],
          value: localStorage.getItem('shape') || 'triangle',
          formControlName: 'shape',
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'color-picker',
          label: 'رنگ مرکزی نقاط',
          labelWidth: 200,
          formControlName: 'color',
          value: localStorage.getItem('color') || '#283593',
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'text',
          label: 'قطر حاشیه نقاط (0-20)',
          labelWidth: 200,
          formControlName: 'strokeWidth',
          value: localStorage.getItem('strokeWidth') || 1,
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'color-picker',
          label: 'رنگ حاشیه نقاط',
          labelWidth: 200,
          formControlName: 'strokeColor',
          value: localStorage.getItem('strokeColor') || '#283593',
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'text',
          label: 'سرعت حرکت (0-200)',
          labelWidth: 200,
          formControlName: 'speed',
          value: localStorage.getItem('speed') || 8,
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'dropdown',
          label: 'جهت حرکت',
          labelWidth: 200,
          dropdownItems: [
            { label: 'درهم', value: 'none' },
            { label: 'بالا', value: 'top' },
            { label: 'بالا-راست', value: 'top-right' },
            { label: 'راست', value: 'right' },
            { label: 'پایین-راست', value: 'bottom-right' },
            { label: 'پایین', value: 'bottom' },
            { label: 'پایین-چپ', value: 'bottom-left' },
            { label: 'چپ', value: 'left' },
            { label: 'بالا-چپ', value: 'top-left' },
          ],
          formControlName: 'direction',
          value: localStorage.getItem('direction') || 'none',
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'dropdown',
          label: 'فعالسازی خطوط',
          labelWidth: 200,
          dropdownItems: [
            { label: 'بله', value: true },
            { label: 'خیر', value: false },
          ],
          formControlName: 'enableLines',
          value: localStorage.getItem('enableLines') || true,
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'text',
          label: 'قطر خطوط (0-20)',
          labelWidth: 200,
          formControlName: 'lineWidth',
          value: localStorage.getItem('lineWidth') || 1,
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'text',
          label: 'جاذبه خطوط (0-2000)',
          labelWidth: 200,
          formControlName: 'lineGravity',
          value: localStorage.getItem('lineGravity') || 150,
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'color-picker',
          label: 'رنگ خطوط',
          labelWidth: 200,
          formControlName: 'lineColor',
          value: localStorage.getItem('lineColor') || '#283593',
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'text',
          label: 'شفافیت خطوط (0-1)',
          labelWidth: 200,
          formControlName: 'lineOpacity',
          value: localStorage.getItem('lineOpacity') || 1,
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'text',
          label: 'سایز حباب (0-500)',
          labelWidth: 200,
          formControlName: 'bubbleSize',
          value: localStorage.getItem('bubbleSize') || 100,
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
        {
          type: 'text',
          label: 'شفافیت حباب (0-1)',
          labelWidth: 200,
          formControlName: 'bubbleOpacity',
          value: localStorage.getItem('bubbleOpacity') || 0.5,
          errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        },
      ])
      .onClose.subscribe((value) => {
        if (value) {
          this.ParticlesConfig.interactivity.events.onhover.mode =
            value.onHoverMode;
          this.ParticlesConfig.interactivity.events.onclick.mode =
            value.onClickMode;
          this.ParticlesConfig.interactivity.modes.grab.distance =
            value.mouseLineGravity;
          this.ParticlesConfig.interactivity.modes.bubble.distance =
            value.mouseBubbleGravity;
          this.ParticlesConfig.particles.number.value = value.number;
          this.ParticlesConfig.particles.shape.type = value.shape;
          this.ParticlesConfig.particles.color.value = value.color;
          this.ParticlesConfig.particles.shape.stroke.color = value.strokeColor;
          this.ParticlesConfig.interactivity.modes.bubble.opacity =
            value.bubbleOpacity;
          this.ParticlesConfig.particles.move.speed = value.speed;
          this.ParticlesConfig.particles.move.direction = value.direction;
          this.ParticlesConfig.particles.line_linked.enable = value.enableLines;
          this.ParticlesConfig.particles.line_linked.width = value.lineWidth;
          this.ParticlesConfig.particles.line_linked.distance =
            value.lineGravity;
          this.ParticlesConfig.particles.line_linked.color = value.lineColor;
          this.ParticlesConfig.particles.line_linked.opacity =
            value.lineOpacity;
          this.ParticlesConfig.interactivity.modes.bubble.size =
            value.bubbleSize;
          for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
              const element = value[key];
              localStorage.setItem(key, element);
            }
          }
          particlesJS('particles-js', this.ParticlesConfig, () => {});
        }
      });
  }
}
