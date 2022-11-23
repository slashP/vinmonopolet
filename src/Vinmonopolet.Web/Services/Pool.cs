using System.Threading.Tasks.Dataflow;

namespace Vinmonopolet.Web.Services;

public sealed class Pool<T>
{
    private readonly BufferBlock<Pooled<T>> _block;

    public Pool(int capacity)
    {
        _block = new(new DataflowBlockOptions { BoundedCapacity = capacity });
    }

    public Task<Pooled<T>> AllocateAsync() => _block.ReceiveAsync();

    public void AddToPool(T element) => _block.Post(new Pooled<T>(this, element));

    public void Release(Pooled<T> pooledElement) => _block.Post(pooledElement);
}

public sealed class Pooled<T> : IAsyncDisposable
{
    private readonly Pool<T> _pool;

    public Pooled(Pool<T> pool, T page)
    {
        _pool = pool;
        Page = page;
    }

    public T Page { get; }

    public ValueTask DisposeAsync()
    {
        _pool.Release(this);
        return ValueTask.CompletedTask;
    }
}
