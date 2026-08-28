insert into public.faculties (id, name, code, letter) values
  ('11111111-1111-1111-1111-111111111111', 'Estudios Generales Letras', 'EEGGLL', 'L'),
  ('22222222-2222-2222-2222-222222222222', 'Estudios Generales Ciencias', 'EEGGCC', 'C')
on conflict do nothing;

insert into public.semesters (id, name, start_date, end_date, active) values
  ('33333333-3333-3333-3333-333333333333', '2027-1', '2027-03-16', '2027-07-18', true)
on conflict do nothing;

insert into public.onboarding_steps
  (id, title, description, category, sort_order, source_type, official, active)
values
  ('40000000-0000-0000-0000-000000000001', 'Conoce tu correo PUCP', 'Configura tu cuenta institucional.', 'before_classes', 1, 'official', true, true),
  ('40000000-0000-0000-0000-000000000002', 'Activa tus plataformas', 'Ingresa a PAIDEIA y campus virtual.', 'before_classes', 2, 'official', true, true),
  ('40000000-0000-0000-0000-000000000003', 'Ubica tus salones', 'Encuentra letras y pabellones.', 'first_week', 3, 'jh', false, true),
  ('40000000-0000-0000-0000-000000000004', 'Conoce DAES', 'Identifica servicios de bienestar.', 'first_week', 4, 'official', true, true),
  ('40000000-0000-0000-0000-000000000005', 'Conoce tu Centro Federado', 'Canales y actividades de bienvenida.', 'first_week', 5, 'cf', false, true),
  ('40000000-0000-0000-0000-000000000006', 'Conoce a tu JH', 'Guarda contacto y acuerdos.', 'first_week', 6, 'jh', false, true),
  ('40000000-0000-0000-0000-000000000007', 'Tramites importantes', 'Fechas y procesos clave.', 'first_month', 7, 'official', true, true),
  ('40000000-0000-0000-0000-000000000008', 'Servicios de bienestar', 'Apoyo y acompanamiento durante el ciclo.', 'during_semester', 8, 'official', true, true)
on conflict do nothing;

insert into public.campus_places
  (name, type, faculty_id, building_code, latitude, longitude, description)
values
  ('Biblioteca', 'library', null, null, -12.0696, -77.0807, 'Punto de estudio y encuentro.'),
  ('DAES', 'service', null, null, -12.0691, -77.0801, 'Bienestar estudiantil.'),
  ('Cafeteria', 'food', null, null, -12.0699, -77.0799, 'Comida y descanso.'),
  ('Estudios Generales', 'academic', '11111111-1111-1111-1111-111111111111', 'L', -12.0689, -77.0794, 'Aulas de primer ciclo.'),
  ('Topico', 'health', null, null, -12.0702, -77.0805, 'Atencion basica de salud.'),
  ('Facultad de Letras', 'academic', '11111111-1111-1111-1111-111111111111', 'A', -12.0686, -77.0802, 'Referencia academica.')
on conflict do nothing;
