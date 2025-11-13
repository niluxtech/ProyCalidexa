<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Tickets CalidexA</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #FFD700; font-weight: bold; }
        h1 { text-align: center; color: #333; }
        .header { text-align: center; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Reporte de Tickets - CalidexA</h1>
        @if(isset($empresa))
            <p><strong>Empresa:</strong> {{ $empresa->nombre }}</p>
        @endif
        <p><strong>Fecha:</strong> {{ now()->format('d/m/Y H:i') }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Código Ticket</th>
                <th>Empresa</th>
                <th>Estado</th>
                <th>Resultado</th>
                <th>Premio</th>
                <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
            @foreach($tickets as $ticket)
            <tr>
                <td>{{ $ticket->id }}</td>
                <td>{{ $ticket->codigo_ticket }}</td>
                <td>{{ $ticket->empresa->nombre }}</td>
                <td>{{ ucfirst($ticket->estado) }}</td>
                <td>{{ $ticket->resultado ?? '-' }}</td>
                <td>{{ $ticket->premio ?? '-' }}</td>
                <td>{{ $ticket->created_at->format('d/m/Y') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <p style="margin-top: 20px; text-align: center; color: #666;">
        Total de tickets: {{ count($tickets) }}
    </p>
</body>
</html>