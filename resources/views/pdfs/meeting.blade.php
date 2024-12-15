<!DOCTYPE html>
<html class="h-full"
      lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link href="https://fonts.bunny.net"
          rel="preconnect">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap"
          rel="stylesheet" />

    @vite('resources/js/app.tsx')
</head>

<body class="h-full font-sans antialiased">

    <div class="flex min-h-screen flex-col">

        <div class="flex h-16 bg-blue-300">
            <img class="m-2 h-12"
                 src="{{ asset('img/minutesmaestro.png') }}"
                 alt="Logo">
            <h1 class="pt-4 text-center text-2xl text-white">{{ $meeting->name }}</h1>

        </div>


        <div class="flex-1 p-4"
             id="content">
            <div class="container mx-auto">
                <h2 class="text-2xl font-bold">Meeting Minutes</h2>
                <p class="mb-2">Date: {{ $meeting->start_time->format('d/m/Y') }}</p>
                @if($meeting->minutes_approved == 0)
                    <p class="mb-6">Status: Draft</p>
                @else
                    <p class="mb-6">Status: Approved</p>
                @endif

                @foreach ($meeting->notes as $minute)
                    <div class="mb-4 border-b-2 border-gray-300 pb-4">
                        <h3 class="text-xl font-bold">{{ $minute->committee->name }}</h3>
                        <p>{!! $minute->content !!}</p>
                    </div>
                @endforeach
            </div>
        </div>

        <footer class="bg-blue-300 p-4 text-center text-white">
            <p>&copy; Minutes Maestro</p>
        </footer>
    </div>
</body>

</html>
