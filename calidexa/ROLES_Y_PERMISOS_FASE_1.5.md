# Sistema de Roles y Permisos - CalidexA API
## Implementación Fase 1.5 - 2

---

## Estado Actual (Fase 1)

### ✅ Implementado
- Autenticación con Sanctum (tokens)
- Campo `role` en tabla `users` (admin/editor)
- Métodos auxiliares en modelo User: `isAdmin()`, `isEditor()`
- Todas las rutas protegidas con `auth:sanctum`

### ⏳ Pendiente para Fase 1.5-2
- Middleware `CheckRole` para filtrar por rol
- Separación de rutas según permisos
- Auditoría de acciones (logs)

---

## Estructura de Roles

### Admin (Completo)
- ✅ CRUD completo de Empresas
- ✅ CRUD completo de Noticias
- ✅ CRUD completo de Tickets
- ✅ Generación masiva de tickets
- ✅ Exportaciones PDF/Excel
- ✅ Acceso a Dashboard con estadísticas
- ✅ Eliminación de registros

### Editor (Limitado) - Fase 2
- ✅ Crear y editar Empresas (sin eliminar)
- ✅ Crear y editar Noticias (sin eliminar)
- ✅ Ver Tickets (solo lectura)
- ❌ NO puede generar tickets
- ❌ NO puede eliminar registros
- ❌ NO puede exportar datos

---

## Implementación del Middleware (Preparado)

### 1. Crear Middleware
```bash
php artisan make:middleware CheckRole
```

**Archivo: `app/Http/Middleware/CheckRole.php`**
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Verifica si el usuario autenticado tiene el rol requerido
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  ...$roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!$request->user()) {
            return response()->json([
                'message' => 'No autenticado'
            ], 401);
        }

        if (!in_array($request->user()->role, $roles)) {
            return response()->json([
                'message' => 'No tienes permisos para acceder a este recurso',
                'required_role' => $roles,
                'your_role' => $request->user()->role
            ], 403);
        }

        return $next($request);
    }
}
```

**Palabras clave:**
- `...$roles`: Acepta múltiples roles como parámetros
- `in_array()`: Verifica si el rol del usuario está en la lista permitida
- `403`: Código HTTP "Prohibido"

---

### 2. Registrar Middleware

**Archivo: `bootstrap/app.php`**
```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'role' => \App\Http\Middleware\CheckRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
```

---

## Opciones de Implementación en Rutas

### Opción A: Protección Quirúrgica (Recomendada para Fase 1.5)

Solo protege operaciones críticas (eliminar):
```php
// routes/api.php

Route::middleware('auth:sanctum')->group(function () {
    
    // Dashboard (todos los autenticados)
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    // Empresas - Editor puede crear/editar, solo Admin elimina
    Route::get('/empresas', [EmpresaController::class, 'index']);
    Route::post('/empresas', [EmpresaController::class, 'store']);
    Route::get('/empresas/{id}', [EmpresaController::class, 'show']);
    Route::put('/empresas/{id}', [EmpresaController::class, 'update']);
    Route::delete('/empresas/{id}', [EmpresaController::class, 'destroy'])
        ->middleware('role:admin'); // ← SOLO ADMIN
    
    // Noticias - Editor puede crear/editar, solo Admin elimina
    Route::get('/noticias', [NoticiaController::class, 'index']);
    Route::post('/noticias', [NoticiaController::class, 'store']);
    Route::get('/noticias/{id}', [NoticiaController::class, 'show']);
    Route::put('/noticias/{id}', [NoticiaController::class, 'update']);
    Route::delete('/noticias/{id}', [NoticiaController::class, 'destroy'])
        ->middleware('role:admin'); // ← SOLO ADMIN
    
    // Tickets - Solo Admin
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('tickets', TicketController::class);
        Route::get('/tickets-estadisticas', [TicketController::class, 'estadisticas']);
        Route::get('/tickets-exportar/pdf', [TicketController::class, 'exportarPDF']);
        Route::get('/tickets-exportar/excel', [TicketController::class, 'exportarExcel']);
    });
    
    // Tickets - Editor solo lectura
    Route::get('/tickets', [TicketController::class, 'index'])
        ->middleware('role:editor,admin');
    Route::get('/tickets/{id}', [TicketController::class, 'show'])
        ->middleware('role:editor,admin');
});
```

---

### Opción B: Separación Total por Rol (Fase 2 Completa)

Separa completamente las rutas por rol:
```php
// routes/api.php

Route::middleware('auth:sanctum')->group(function () {
    
    // Rutas comunes (todos los autenticados)
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    // ========== SOLO ADMIN ==========
    Route::middleware('role:admin')->group(function () {
        
        // CRUD completo
        Route::apiResource('empresas', EmpresaController::class);
        Route::apiResource('noticias', NoticiaController::class);
        Route::apiResource('tickets', TicketController::class);
        
        // Operaciones especiales
        Route::get('/tickets-estadisticas', [TicketController::class, 'estadisticas']);
        Route::get('/tickets-exportar/pdf', [TicketController::class, 'exportarPDF']);
        Route::get('/tickets-exportar/excel', [TicketController::class, 'exportarExcel']);
        Route::get('/tickets-empresa/{slug}/pdf', [TicketController::class, 'exportarPorEmpresaPDF']);
        Route::get('/tickets-empresa/{slug}/excel', [TicketController::class, 'exportarPorEmpresaExcel']);
        Route::get('/empresas-select', [EmpresaController::class, 'selectOptions']);
    });
    
    // ========== ADMIN Y EDITOR ==========
    Route::middleware('role:admin,editor')->group(function () {
        
        // Empresas (sin eliminar)
        Route::get('/empresas', [EmpresaController::class, 'index']);
        Route::post('/empresas', [EmpresaController::class, 'store']);
        Route::get('/empresas/{id}', [EmpresaController::class, 'show']);
        Route::put('/empresas/{id}', [EmpresaController::class, 'update']);
        
        // Noticias (sin eliminar)
        Route::get('/noticias', [NoticiaController::class, 'index']);
        Route::post('/noticias', [NoticiaController::class, 'store']);
        Route::get('/noticias/{id}', [NoticiaController::class, 'show']);
        Route::put('/noticias/{id}', [NoticiaController::class, 'update']);
        
        // Tickets (solo lectura)
        Route::get('/tickets', [TicketController::class, 'index']);
        Route::get('/tickets/{id}', [TicketController::class, 'show']);
    });
});
```

---

## Crear Usuario Editor (Seeder)

**Archivo: `database/seeders/UserSeeder.php`**
```php
User::create([
    'name' => 'Editor CalidexA',
    'email' => 'editor@calidexa.com',
    'password' => Hash::make('password123'),
    'role' => 'editor',
    'email_verified_at' => now(),
]);
```

Ya está implementado en tu seeder actual.

---

## Probar Middleware con Thunder Client/Postman

### 1. Login como Admin

**POST** `http://localhost:8000/api/login`
```json
{
    "email": "admin@calidexa.com",
    "password": "password123"
}
```

**Respuesta:**
```json
{
    "token": "1|xxxxx",
    "user": {
        "role": "admin"
    }
}
```

### 2. Login como Editor

**POST** `http://localhost:8000/api/login`
```json
{
    "email": "editor@calidexa.com",
    "password": "password123"
}
```

### 3. Intentar eliminar empresa como Editor (debe fallar)

**DELETE** `http://localhost:8000/api/empresas/1`
```
Headers:
Authorization: Bearer {token_de_editor}
```

**Respuesta esperada:**
```json
{
    "message": "No tienes permisos para acceder a este recurso",
    "required_role": ["admin"],
    "your_role": "editor"
}
```

### 4. Eliminar empresa como Admin (debe funcionar)

**DELETE** `http://localhost:8000/api/empresas/1`
```
Headers:
Authorization: Bearer {token_de_admin}
```

**Respuesta esperada:**
```json
{
    "message": "Empresa eliminada exitosamente"
}
```

---

## Auditoría (Fase 2 Opcional)

Para registrar quién hizo qué:
```bash
php artisan make:migration create_audit_logs_table
```
```php
Schema::create('audit_logs', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('action'); // create, update, delete
    $table->string('model'); // Empresa, Noticia, Ticket
    $table->unsignedBigInteger('model_id');
    $table->json('changes')->nullable();
    $table->timestamps();
});
```

---

## Checklist de Implementación Fase 1.5

- [ ] Crear middleware `CheckRole`
- [ ] Registrar middleware en `bootstrap/app.php`
- [ ] Elegir opción de rutas (A o B)
- [ ] Actualizar `routes/api.php`
- [ ] Verificar seeders incluyen usuario editor
- [ ] Correr `php artisan migrate:fresh --seed`
- [ ] Probar endpoints con ambos roles
- [ ] Documentar en README principal

---

## Comandos Útiles
```bash
# Listar todas las rutas y sus middlewares
php artisan route:list

# Filtrar rutas de API
php artisan route:list --path=api

# Ver rutas protegidas por role
php artisan route:list | grep "role"

# Crear token de prueba
php artisan tinker
> $user = User::where('email', 'editor@calidexa.com')->first();
> $token = $user->createToken('test')->plainTextToken;
> echo $token;
```

---

## Notas Importantes

1. **Fase 1**: Todas las rutas protegidas solo con `auth:sanctum` (estado actual)
2. **Fase 1.5**: Implementar middleware de roles con Opción A (protección quirúrgica)
3. **Fase 2**: Implementar Opción B completa + auditoría

4. El middleware ya está preparado pero NO aplicado en rutas
5. Solo requiere descomentar/agregar las líneas de middleware en `routes/api.php`

---

## Referencias

- Sanctum Docs: https://laravel.com/docs/11.x/sanctum
- Middleware Docs: https://laravel.com/docs/11.x/middleware
- Authorization Docs: https://laravel.com/docs/11.x/authorization

---

**Documento creado:** 2025-11-09  
**Última actualización:** 2025-11-09  
**Estado:** Preparado para implementación Fase 1.5-2