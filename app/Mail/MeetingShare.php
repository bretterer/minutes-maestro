<?php

namespace App\Mail;

use App\Models\Meeting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use function Spatie\LaravelPdf\Support\pdf;

class MeetingShare extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public Meeting $meeting)
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Meeting Minutes',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.meeting-share',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $name = "{$this->meeting->name}.pdf";
        $pdf = pdf()->view('pdfs.meeting', ['meeting' => $this->meeting])
            ->name($name)
            ->save(storage_path("meetings/tmp/{$name}"));

        return [
            Attachment::fromPath(storage_path("meetings/tmp/{$name}"))
                ->as("{$name}.pdf")
                ->withMime('application/pdf'),
        ];
    }
}
